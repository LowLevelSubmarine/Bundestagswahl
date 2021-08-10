package de._2n1p.bundestagswahl.utils

import com.google.gson.JsonElement
import com.google.gson.JsonNull

class Gson {

    companion object {
        fun JsonElement.surf(vararg keys: Any): JsonElement {
            if (keys.isEmpty()) {
                return this
            } else {
                val key = keys[0]
                if (key is String) {
                    return this.asJsonObject.get(key).surf(keys.copyOfRange(1, keys.size))
                } else if (key is Int) {
                    return this.asJsonArray.get(key).surf(keys.copyOfRange(1, keys.size))
                } else {
                    return JsonNull.INSTANCE
                }
            }
        }
    }

}