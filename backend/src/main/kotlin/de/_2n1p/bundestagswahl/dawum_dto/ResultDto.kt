package de._2n1p.bundestagswahl.dawum_dto

data class ResultDto (
    val points: List<SurveyPoint>,
    val parties: Map<Long, Party>,
    val taskers: Map<Long, Tasker>,
    val institutes: Map<Long, Institute>
)
