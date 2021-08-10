package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dto.Survey
import java.time.LocalDate
import java.time.Period
import kotlin.math.abs

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

    fun getDate(date: LocalDate, surveys: MutableList<Survey>): Map<Long, Float> {
        for (survey in surveys) {
            if (survey.date == date) return survey.results
        }
        var surveyNext = surveys.stream().filter { it.date.isAfter(date) }.min(DayDistance(date)).get()
        var surveyPrev = surveys.stream().filter { it.date.isBefore(date) }.min(DayDistance(date)).get()
        return interpolateSurvey(surveyPrev, surveyNext, date)
    }

    fun interpolateSurvey(s1: Survey, s2: Survey, date: LocalDate): Map<Long, Float> {

    }

    class DayDistance(private val optimum: LocalDate) : Comparator<Survey> {

        override fun compare(p0: Survey?, p1: Survey?): Int {
            return Period.between(p0!!.date, optimum).days - Period.between(p1!!.date, optimum).days
        }

    }

}
