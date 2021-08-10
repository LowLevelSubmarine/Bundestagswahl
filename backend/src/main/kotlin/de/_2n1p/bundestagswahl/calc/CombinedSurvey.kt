package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dto.Survey

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

}