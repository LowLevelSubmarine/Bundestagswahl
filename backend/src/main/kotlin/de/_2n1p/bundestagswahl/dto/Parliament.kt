package de._2n1p.bundestagswahl.dto

data class Parliament(
    val id: Long,
    val shortcut: String,
    val name: String,
    val election: String
) {
    companion object {

        fun fromJson(json: String) {

        }

    }
}