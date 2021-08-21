package de._2n1p.bundestagswahl.dto

import java.time.LocalDate

data class DataPoint(
    val date: LocalDate,
    val values: Map<Long,Float>,
    val surveys: List<Survey>,
)