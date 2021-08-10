package de._2n1p.bundestagswahl.dto

data class Institute(
    val id: Long,
    val name: String
) {
    companion object {

        fun fromJson(json: String) {

        }

    }
}