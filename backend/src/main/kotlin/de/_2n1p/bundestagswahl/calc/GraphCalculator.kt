package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.data.Dawum
import de._2n1p.bundestagswahl.service.ParserService
import org.springframework.beans.factory.annotation.Autowired
import java.time.LocalDate
import java.time.Period

class GraphCalculator {

    fun calculate(dawum: Dawum) {

        val bundestagCode = 0L
        val bundestagSurveys = dawum.surveys.filter { it.value.parliamentId == bundestagCode }

        val period = Period.between(LocalDate.now(), LocalDate.now())


        // Übergeben der Umfrage der letzten 30 Tage bevor und der nächsten 30 Nach

        bundestagSurveys.forEach {
            if (it.value.parliamentId == bundestagCode) {
                it.
            }
        }
    }
}
