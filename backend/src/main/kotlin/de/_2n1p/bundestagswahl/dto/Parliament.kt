package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Parliament(
    val shortcut: String,
    val name: String,
    val election: String
) {
    companion object {

        fun fromJson(gson: JsonElement): Parliament {
            return Parliament(
                shortcut = gson.surf("Shortcut").asString,
                name = gson.surf("Name").asString,
                election = gson.surf("Election").asString
            )
        }

    }
}