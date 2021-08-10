package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Party(
    val id: Long,
    val shortcut: String,
    val name: String
)  {
    companion object {

        fun fromJson(id: Long, json: String): Party {
            val gson = JsonParser.parseString(json)
            return Party(
                id = id,
                shortcut = gson.surf("Shortcut").asString,
                name = gson.surf("Name").asString
            )
        }

    }
}