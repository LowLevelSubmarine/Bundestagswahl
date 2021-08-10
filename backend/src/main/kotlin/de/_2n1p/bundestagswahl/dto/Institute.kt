package de._2n1p.bundestagswahl.dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Institute(
    val name: String
) {
    companion object {

        fun fromJson(gson: JsonElement): Institute {
            return Institute(
                name = gson.surf("Name").asString
            )
        }

    }
}