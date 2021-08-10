package de._2n1p.bundestagswahl.dto

data class Tasker(
    val id: Long,
    val name: String
) {
    companion object {

        fun fromJson(json: String) {

        }

    }
}