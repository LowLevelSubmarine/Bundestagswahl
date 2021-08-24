package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dawum.dto.Dawum
import de._2n1p.bundestagswahl.dawum.dto.Survey
import de._2n1p.bundestagswahl.dto.DataPoint
import de._2n1p.bundestagswahl.utils.Stream.Companion.max
import de._2n1p.bundestagswahl.utils.Stream.Companion.min
import java.time.LocalDate

class GraphCalculator {

    fun calculate(dawum: Dawum): List<DataPoint> {

        val bundestagCode = 0L
        val bundestagSurveys = dawum.surveys.filter { it.value.parliamentId == bundestagCode }

        val dataPoints: MutableList<DataPoint> = mutableListOf()

        val minDay = bundestagSurveys.values.stream().min { it -> it.calcPeriodDate() }.get().date.toEpochDay()
        val maxDay = bundestagSurveys.values.stream().max { it -> it.calcPeriodDate() }.get().date.toEpochDay()
        val runningThreads = mutableListOf<Thread>()
        for (i in minDay..maxDay+1) {
            val thread = Thread {
                val currDay = LocalDate.ofEpochDay(i)
                val map = mutableMapOf<Long, FloatAverage>()
                val adjustmentValues = CombinedSurvey(bundestagSurveys.values.toList()).calcPartyAdjustments(currDay, 30)
                val currSurveys = mutableListOf<Survey>()
                bundestagSurveys.filter { it.value.calcPeriodDate() == currDay }.forEach { surveyEntry ->
                    val adjustedResult = surveyEntry.value.results.mapValues {
                        val adjustmentValue = adjustmentValues[surveyEntry.value.instituteId]?.get(it.key)
                        if (adjustmentValue != null) it.value + adjustmentValue else it.value
                    }
                    adjustedResult.forEach { map.getOrPut(it.key) { FloatAverage() }.add(it.value) }
                    currSurveys.add(surveyEntry.value)
                }
                if (currSurveys.isNotEmpty()) {
                    dataPoints.add(DataPoint(currDay, map.mapValues { it.value.calc() }, currSurveys.map { de._2n1p.bundestagswahl.dto.Survey.fromDawumSurvey(it) }))
                }
                /*if (adjustmentValues.containsKey(13L)) {
                    surveyPoints.add(SurveyPoint(currDay, adjustmentValues.get(13L)!!, 0L, 0L))
                }*/
            }
            runningThreads.add(thread)
            thread.start()
        }
        runningThreads.forEach(Thread::join)
        return dataPoints
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
