package de._2n1p.bundestagswahl.dto

import de._2n1p.bundestagswahl.dawum.dto.Institute
import de._2n1p.bundestagswahl.dawum.dto.Party
import de._2n1p.bundestagswahl.dawum.dto.Tasker

data class ResultDto (
    val today: Today?,
    val points: List<DataPoint>,
    val parties: Map<Long, Party>,
    val taskers: Map<Long, Tasker>,
    val institutes: Map<Long, Institute>
)
