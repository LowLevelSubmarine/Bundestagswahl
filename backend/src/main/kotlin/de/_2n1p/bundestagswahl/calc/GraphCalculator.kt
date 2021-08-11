package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.data.Dawum
import de._2n1p.bundestagswahl.dto.Survey
import de._2n1p.bundestagswahl.dto.SurveyPoint
import java.time.LocalDate
import java.time.Period

class GraphCalculator {

    fun calculate(dawum: Dawum): List<SurveyPoint> {

        val bundestagCode = 0L
        val bundestagSurveys = dawum.surveys.filter { it.value.parliamentId == bundestagCode }

        val surveyPoints: MutableList<SurveyPoint> = mutableListOf()

        bundestagSurveys.forEach {
            val adjustmentValues = CombinedSurvey(bundestagSurveys.values.toList()).calcPartyAdjustments(it.value.date,30)
            surveyPoints.add(SurveyPoint(it.value.date,calculatePartyAdjustedSurveys(adjustmentValues,it.value).results,it.value.instituteId,it.value.instituteId))
        }

        return surveyPoints
    }

    private fun calculatePartyAdjustedSurveys(adjustmentValues: Map<Long, Map<Long, Float>>, survey: Survey): Survey {
        val institute = survey.instituteId

        val adjustedMap = survey.results.mapValues { it -> it.value + adjustmentValues[institute]?.get(it.key)!! }



        return Survey(
            survey.date,
            survey.surveyPeriodStart,
            survey.surveyPeriodEnd,
            survey.surveyedPersons,
            survey.parliamentId,
            survey.instituteId,
            survey.taskerId,
            adjustedMap
        )


    }
}
