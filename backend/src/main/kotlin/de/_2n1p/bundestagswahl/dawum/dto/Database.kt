package de._2n1p.bundestagswahl.dawum.dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf

data class Database(
    val publisher: String,
    val author: String,
    val lastUpdate: String,
    val licenseName: String,
    val licenseShortcut: String,
    val licenseLink: String
) {
    companion object {

        fun fromJson(gson: JsonElement): Database {
            return Database(
                publisher = gson.surf("Publisher").asString,
                author = gson.surf("Author").asString,
                lastUpdate = gson.surf("Last_Update").asString,
                licenseName = gson.surf("License", "Name").asString,
                licenseShortcut = gson.surf("License" ,"Shortcut").asString,
                licenseLink = gson.surf("License", "Link").asString
            )
        }

    }
}