package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Institute(
    val id: Long,
    val name: String
) {
    companion object {

        fun fromJson(id: Long, json: String): Institute {
            val gson = JsonParser.parseString(json)
            return Institute(
                id = id,
                name = gson.surf("name").asString
            )
        }

    }
}