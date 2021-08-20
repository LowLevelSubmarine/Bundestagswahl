package de._2n1p.bundestagswahl.dawum.dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Tasker(
    val name: String
) {
    companion object {

        fun fromJson(gson: JsonElement): Tasker {
            return Tasker(
                name = gson.surf("Name").asString
            )
        }

    }
}