package de._2n1p.bundestagswahl.dto

import de._2n1p.bundestagswahl.dawum.dto.Survey
import java.time.LocalDate

data class Survey(
    val startDate: LocalDate,
    val endDate: LocalDate,
    val releaseDate: LocalDate,
    val instituteId: Long,
    val taskerId: Long,
) {
    companion object {
        fun fromDawumSurvey(survey: Survey): de._2n1p.bundestagswahl.dto.Survey {
            return Survey(
                startDate = survey.surveyPeriodStart,
                endDate = survey.surveyPeriodEnd,
                releaseDate = survey.date,
                instituteId = survey.instituteId,
                taskerId = survey.taskerId
            )
        }
    }
}