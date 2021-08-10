package de._2n1p.bundestagswahl.dto

data class Party(
    val id: Long,
    val shortcut: String,
    val name: String
)  {
    companion object {

        fun fromJson(json: String) {

        }

    }
}