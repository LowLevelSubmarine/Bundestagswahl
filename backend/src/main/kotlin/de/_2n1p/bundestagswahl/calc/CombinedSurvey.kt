package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dawum.dto.Survey
import de._2n1p.bundestagswahl.utils.Date.Companion.isBetween
import de._2n1p.bundestagswahl.utils.Optional.Companion.orNull
import java.lang.Long.max
import java.lang.Long.min
import java.time.LocalDate
import kotlin.math.abs

class CombinedSurvey(private val surveys: List<Survey>) {

    val surveysByInstitute: Map<Long, List<Survey>>

    init {
        val map: MutableMap<Long, MutableList<Survey>> = mutableMapOf()
        for (survey in surveys) {
            map.putIfAbsent(survey.instituteId, mutableListOf())
            map.get(survey.instituteId)?.add(survey)
        }
        this.surveysByInstitute = map
    }

    fun calcPartyAdjustments(date: LocalDate, range: Int): Map<Long, Map<Long, Float>> {
        val avgByInstituteAndParty = mutableMapOf<Long, MutableMap<Long, FloatAverage>>()
        val newestSurveyEpochDay = surveys.maxByOrNull { it.calcPeriodDate() }!!.calcPeriodDate().toEpochDay()
        val oldestSurveyEpochDay = surveys.minByOrNull { it.calcPeriodDate() }!!.calcPeriodDate().toEpochDay()
        val startDay = max(date.toEpochDay() - range, oldestSurveyEpochDay)
        val endDay = min(date.toEpochDay() + range, newestSurveyEpochDay)
        for (i in startDay..endDay) {
            val currentDate = LocalDate.ofEpochDay(i)
            for (surveysByInstituteEntry in this.surveysByInstitute.entries) {
                val result = getDate(currentDate, 60, surveysByInstituteEntry.value)
                if (result.isNotEmpty()) {
                    val avgByParty = avgByInstituteAndParty.getOrPut(surveysByInstituteEntry.key){ mutableMapOf() }
                    for (resultEntry in result.entries) {
                        avgByParty.getOrPut(resultEntry.key){ FloatAverage() }.add(resultEntry.value)
                    }
                }
            }
        }
        val sufficientInstitutes = mutableListOf<Long>()
        val avgByParty = mutableMapOf<Long, FloatAverage>()
        for (avgByInstituteAndPartyEntry in avgByInstituteAndParty) {
            if (avgByInstituteAndPartyEntry.value[0]!!.getAmount() * 2 > endDay - startDay) {
                sufficientInstitutes.add(avgByInstituteAndPartyEntry.key)
                for (avgByPartyEntry in avgByInstituteAndPartyEntry.value) {
                    avgByParty.getOrPut(avgByPartyEntry.key){ FloatAverage() }.add(avgByPartyEntry.value.calc())
                }
            }
        }
        val adjByInstituteAndParty = mutableMapOf<Long, MutableMap<Long, Float>>()
        for (adjByInstituteAndPartyEntry in avgByInstituteAndParty.filterKeys { sufficientInstitutes.contains(it) }) {
            val adjByParty = mutableMapOf<Long, Float>()
            for (adjByPartyEntry in adjByInstituteAndPartyEntry.value) {
                adjByParty[adjByPartyEntry.key] = avgByParty[adjByPartyEntry.key]!!.calc() - adjByPartyEntry.value.calc()
            }
            adjByInstituteAndParty[adjByInstituteAndPartyEntry.key] = adjByParty
        }
        return adjByInstituteAndParty
    }

    private fun getDate(date: LocalDate, range: Int, surveys: List<Survey>): Map<Long, Float> {
        val surveyNext = surveys.stream().filter { it.calcPeriodDate().isBetween(date, date.plusDays(range.toLong())) }.min(DayDistance(date)).orNull()
        val surveyPrev = surveys.stream().filter { it.calcPeriodDate().isBetween(date, date.minusDays(range.toLong())) }.min(DayDistance(date)).orNull()
        if (surveyNext == null || surveyPrev == null) {
            return mapOf()
        }
        if (surveyNext == surveyPrev) return surveyNext.results
        else return interpolateSurvey(surveyPrev, surveyNext, date)
    }

    private fun interpolateSurvey(s1: Survey, s2: Survey, date: LocalDate): Map<Long, Float> {
        val pos = (date.toEpochDay() - s1.calcPeriodDate().toEpochDay()).toFloat() / (s2.calcPeriodDate().toEpochDay() - s1.calcPeriodDate().toEpochDay())
        val map = mutableMapOf<Long, Float>()
        val partyIds = s1.results.keys.union(s2.results.keys)
        for (partyId in partyIds) {
            map[partyId] = Interpolate.linear(
                s1.results.getOrDefault(partyId, 0F),
                s2.results.getOrDefault(partyId, 0F),
                pos
            )
        }
        return map
    }

    private class DayDistance(private val optimum: LocalDate) : Comparator<Survey> {

        override fun compare(p0: Survey?, p1: Survey?): Int {
            return distance(p0!!).compareTo(distance(p1!!))
        }

        fun distance(survey: Survey): Long {
            return abs(survey.calcPeriodDate().toEpochDay() - optimum.toEpochDay())
        }

    }

}
