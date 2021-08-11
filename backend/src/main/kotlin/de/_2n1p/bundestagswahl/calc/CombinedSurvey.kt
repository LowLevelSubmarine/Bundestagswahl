package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dto.Survey
import java.time.LocalDate
import java.time.Period

class CombinedSurvey(surveys: List<Survey>) {

    val surveyByInstitute: Map<Long, List<Survey>>

    init {
        val map: MutableMap<Long, MutableList<Survey>> = mutableMapOf()
        for (survey in surveys) {
            map.putIfAbsent(survey.instituteId, mutableListOf())
            map.get(survey.instituteId)?.add(survey)
        }
        this.surveyByInstitute = map
    }

    fun calcPartyAdjustments(date: LocalDate): Map<Long, Map<Long, Float>> {
        for (institue in this.surveyByInstitute.keys) {
            
        }
    }

    fun getDate(date: LocalDate, surveys: MutableList<Survey>): Map<Long, Float> {
        for (survey in surveys) {
            if (survey.date == date) return survey.results
        }
        val surveyNext = surveys.stream().filter { it.date.isAfter(date) }.min(DayDistance(date)).orElse(null)
        val surveyPrev = surveys.stream().filter { it.date.isBefore(date) }.min(DayDistance(date)).orElse(null)
        if (surveyNext == null || surveyPrev == null) {
            if (surveyNext != null) return surveyNext.results
            else if (surveyPrev != null) return surveyPrev.results
            else return mapOf()
        }
        return interpolateSurvey(surveyPrev, surveyNext, date)
    }

    private fun interpolateSurvey(s1: Survey, s2: Survey, date: LocalDate): Map<Long, Float> {
        val pos = (date.toEpochDay() - s1.date.toEpochDay()).toFloat() / (s2.date.toEpochDay() - s1.date.toEpochDay())
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
            return Period.between(p0!!.date, optimum).days - Period.between(p1!!.date, optimum).days
        }

    }

}
