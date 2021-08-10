package de._2n1p.bundestagswahl.data

import com.google.gson.JsonParser
import de._2n1p.bundestagswahl.dto.*

class Dawum(json: String) {

    val database: Database
    val institutes: Map<Long, Institute>
    val parliaments: Map<Long, Parliament>
    val parties: Map<Long, Party>
    val surveys: Map<Long, Survey>
    val taskers: Map<Long, Tasker>

    init {
        val gson = JsonParser.parseString(json).asJsonObject
        this.database = Database.fromJson(gson.get("Database"))
        val lulz = gson.get("Institutes").asJsonObject
        this.institutes = lulz.entrySet().associate { Pair(it.key.toLong(), Institute.fromJson(it.value)) }
        this.parliaments = gson.get("Parliaments").asJsonObject.entrySet().associate { Pair(it.key.toLong(), Parliament.fromJson(it.value)) }
        this.parties = gson.get("Parties").asJsonObject.entrySet().associate { Pair(it.key.toLong(), Party.fromJson(it.value)) }
        this.surveys = gson.get("Surveys").asJsonObject.entrySet().associate { Pair(it.key.toLong(), Survey.fromJson(it.value)) }
        this.taskers = gson.get("Taskers").asJsonObject.entrySet().associate { Pair(it.key.toLong(), Tasker.fromJson(it.value)) }
    }

}