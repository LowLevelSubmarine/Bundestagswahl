package de._2n1p.bundestagswahl.dawum_dto

import com.google.gson.JsonElement
import de._2n1p.bundestagswahl.utils.Gson.Companion.surf
import java.time.LocalDate

data class Survey(
    val date: LocalDate,
    val surveyPeriodStart: LocalDate,
    val surveyPeriodEnd: LocalDate,
    val surveyedPersons: Int,
    val parliamentId: Long,
    val instituteId: Long,
    val taskerId: Long,
    val results: Map<Long, Float>
) {

    companion object {
        fun fromJson(gson: JsonElement): Survey {
            return Survey(
                date = LocalDate.parse(gson.surf("Date").asString),
                surveyPeriodStart = LocalDate.parse(gson.surf("Survey_Period", "Date_Start").asString),
                surveyPeriodEnd = LocalDate.parse(gson.surf("Survey_Period", "Date_Start").asString),
                surveyedPersons = gson.surf("Surveyed_Persons").asInt,
                parliamentId = gson.surf("Parliament_ID").asLong,
                instituteId = gson.surf("Institute_ID").asLong,
                taskerId = gson.surf("Tasker_ID").asLong,
                results = gson.surf("Results").asJsonObject.entrySet().associate { Pair(it.key.toLong(), it.value.asFloat) }
            )
        }
    }

    fun calcPeriodDate(): LocalDate {
        return LocalDate.ofEpochDay((this.surveyPeriodStart.toEpochDay() + this.surveyPeriodEnd.toEpochDay()) / 2)
    }

}