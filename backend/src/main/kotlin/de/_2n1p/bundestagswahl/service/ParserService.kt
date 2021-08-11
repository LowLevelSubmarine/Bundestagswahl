package de._2n1p.bundestagswahl.service

import de._2n1p.bundestagswahl.calc.GraphCalculator
import de._2n1p.bundestagswahl.data.Dawum
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
        logger.info("Fetched new JSON")
        dawum = Dawum(DawumDbRequest(httpClientService).fetch())
        val surveyPoints = GraphCalculator().calculate(dawum!!)
        logger.info("Done Fetching new JSON")
        result = ResultDto(surveyPoints,dawum!!.parties, dawum!!.taskers,dawum!!.institutes)


        dawumListeners.forEach {
            it.getDawum(dawum!!)
        }
    }

    fun registerDawumListener(dawumListener: DawumListener) {
        dawumListeners.add(dawumListener)
    }

}

interface DawumListener {
    fun getDawum(dawum:Dawum)
}
