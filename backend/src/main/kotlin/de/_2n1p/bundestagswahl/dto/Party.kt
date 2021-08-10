package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Party(
    val shortcut: String,
    val name: String
) {

    companion object {
        fun fromJson(gson: JsonElement): Party {
            return Party(
                shortcut = gson.surf("Shortcut").asString,
                name = gson.surf("Name").asString
            )
        }
    }

}