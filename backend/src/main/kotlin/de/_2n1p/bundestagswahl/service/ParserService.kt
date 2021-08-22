package de._2n1p.bundestagswahl.service

import de._2n1p.bundestagswahl.calc.GraphCalculator
import de._2n1p.bundestagswahl.calc.SeatDistribution
import de._2n1p.bundestagswahl.calc.ChangesText
import de._2n1p.bundestagswahl.dawum.dto.Dawum
import de._2n1p.bundestagswahl.dto.ResultDto
import de._2n1p.bundestagswahl.requests.DawumDbRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
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
        logger.info("Fetching Dawum ...")
        dawum = Dawum(DawumDbRequest(httpClientService).fetch())
        logger.info("Recalculating database ...")
        val dataPoints = GraphCalculator().calculate(dawum!!)
        val seatDistribution = SEAT_DISTRIBUTION.calc(dataPoints.last().values)
        val sortedDataPoints = dataPoints.sortedBy { it.date }.reversed()
        val today = ChangesText(sortedDataPoints[1], sortedDataPoints[0], dawum!!).getToday()
        result = ResultDto(today, seatDistribution, dataPoints, dawum!!.parties, dawum!!.taskers, dawum!!.institutes)
        logger.info("Updated database")
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