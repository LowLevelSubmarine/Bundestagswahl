package de._2n1p.bundestagswahl.service

import de._2n1p.bundestagswahl.calc.GraphCalculator
import de._2n1p.bundestagswahl.calc.SeatDistribution
import de._2n1p.bundestagswahl.calc.TodayText
import de._2n1p.bundestagswahl.dawum.dto.Dawum
import de._2n1p.bundestagswahl.dto.ResultDto
import de._2n1p.bundestagswahl.requests.DawumDbRequest
import de._2n1p.bundestagswahl.utils.Date.Companion.isBetween
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


@Component
class ParserService(val httpClientService: HttpClientService) {

    private val logger: Logger = LoggerFactory.getLogger(this::class.java)
    var dawum: Dawum? = null
    var result: ResultDto?= null
    private var lastParse: LocalDateTime? = null
    private val dawumListeners:MutableList<DawumListener> = mutableListOf()

    @Scheduled(fixedDelay = 30000)
    fun parse() {
        val timeString = httpClientService.getForUrl("https://api.dawum.de/last_update.txt")
        val time = LocalDateTime.parse(timeString, DateTimeFormatter.ISO_DATE_TIME)
        if (lastParse== null || time.isAfter(lastParse)) {
            fetchDawumBody()
            lastParse = LocalDateTime.now()
        }
    }

    private fun fetchDawumBody() {
        logger.info("Fetched new JSON")
        dawum = Dawum(DawumDbRequest(httpClientService).fetch())
        val surveyPoints = GraphCalculator().calculate(dawum!!)
        logger.info("Done Fetching new JSON")
        val seatDistribution = SEAT_DISTRIBUTION.calc(surveyPoints.last().values)
        val dateNow = LocalDate.now()
        val todaysSurveyBasedDataPoint = surveyPoints.find { dataPoint -> dataPoint.surveys.find { survey -> survey.releaseDate == dateNow } != null }
        if (todaysSurveyBasedDataPoint != null) {
            val lastDataPoint = surveyPoints.filter { it.date.isBefore(todaysSurveyBasedDataPoint.date) }.maxByOrNull { it.date }
            val today = TodayText(todaysSurveyBasedDataPoint, lastDataPoint!!, dawum!!).getToday()
            result = ResultDto(today, seatDistribution, surveyPoints, dawum!!.parties, dawum!!.taskers, dawum!!.institutes)
        } else {
            result = ResultDto(null, seatDistribution, surveyPoints, dawum!!.parties, dawum!!.taskers, dawum!!.institutes)
        }
        dawumListeners.forEach {
            it.getDawum(dawum!!)
        }
    }

    fun registerDawumListener(dawumListener: DawumListener) {
        dawumListeners.add(dawumListener)
    }

    companion object {
        val SEAT_DISTRIBUTION = SeatDistribution(598, 5F)
    }

    interface DawumListener {
        fun getDawum(dawum: Dawum)
    }

}