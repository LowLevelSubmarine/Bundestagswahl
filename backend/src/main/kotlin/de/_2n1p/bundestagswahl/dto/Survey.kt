package de._2n1p.bundestagswahl.dto

import java.time.LocalDate

data class Survey(
    val id: Long,
    val date: LocalDate,
    val surveyPeriodStart: LocalDate,
    val surveyPeriodEnd: LocalDate,
    val surveyedPersons: Int,
    val parliamentId: Long,
    val instituteId: Long,
    val taskerId: Long,
    val results: Map<Long, Float>
) 