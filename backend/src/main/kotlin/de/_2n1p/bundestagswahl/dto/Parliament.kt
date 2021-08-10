package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Parliament(
    val id: Long,
    val shortcut: String,
    val name: String,
    val election: String
) {
    companion object {

        fun fromJson(id: Long, json: String): Parliament {
            val gson = JsonParser.parseString(json)
            return Parliament(
                id = id,
                shortcut = gson.surf("Shortcut").asString,
                name = gson.surf("Name").asString,
                election = gson.surf("Election").asString
            )
        }

    }
}