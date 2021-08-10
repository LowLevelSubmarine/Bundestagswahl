package de._2n1p.bundestagswahl.dto

import java.time.LocalDate

data class SurveyPoint(val date: LocalDate,
                       val value: Float,
                       val institute: String,
                       val tasker: String)
