package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Tasker(
    val id: Long,
    val name: String
) {
    companion object {

        fun fromJson(id: Long, json: String): Tasker {
            val gson = JsonParser.parseString(json)
            return Tasker(
                id = id,
                name = gson.surf("Name").asString
            )
        }

    }
}