package de._2n1p.bundestagswahl.dto

import java.time.LocalDate

data class SurveyPoint(val date: LocalDate,
                       val value: Map<Long,Float>,
                       val institute: Long,
                       val tasker: Long)
