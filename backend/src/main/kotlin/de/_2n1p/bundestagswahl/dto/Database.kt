package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonElement
import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.utils.Gson

data class Database(
    val publisher: String,
    val author: String,
    val lastUpdate: String,
    val licenseName: String,
    val licenseShortcut: String,
    val licenseLink: String
) {
    companion object {

        fun fromJson(json: String): Database {
            val gson = JsonParser.parseString(json)

        }

    }
}
