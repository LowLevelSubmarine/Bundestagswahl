package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dawum.dto.Dawum
import de._2n1p.bundestagswahl.dto.DataPoint
import de._2n1p.bundestagswahl.dto.Today
import java.lang.Math.abs
import java.lang.RuntimeException

class TodayText(val todayData: DataPoint, val lastData: DataPoint, val dawum: Dawum) {

    init {
        if (this.todayData.surveys.isEmpty()) throw RuntimeException("DataPoint must consist of at least one survey!")
    }

    fun getHeadline(): String {
        var headline = if (this.todayData.surveys.size == 1) "Neue Umfrage: " else "Neue Umfragen: "
        headline += this.todayData.surveys.joinToString(", ") { survey -> this.dawum.institutes[survey.instituteId]!!.name}
        return headline
    }

    fun getSubtext(): String {
        val partyIds = todayData.values.keys.union(lastData.values.keys)
        val partyChanges = partyIds.map { PartyChange(todayData.values[it], lastData.values[it], it) }.sortedBy { -it.calcSignificance() }
        return partyChanges.joinToString(", ") { it.toString() }
    }

    inner class PartyChange(val from: Float?, val to: Float?, val partyId: Long) {

        val change: Float? = if (from != null && to != null) to - from else null

        @Override
        override fun toString(): String {
            val partyName = this@TodayText.dawum.parties[partyId]!!.shortcut
            if (this.change != null) return partyName + " " + "%+.1f".format(change) + "%"
            else if (this.to == null) return "$partyName nicht mehr gezählt"
            else if (this.from == null ) return "$partyName wird wieder gezählt"
            return ""
        }

        fun calcSignificance(): Float {
            return abs(this.change ?: 1F)
        }

    }

    fun getToday(): Today {
        return Today(
            headline = getHeadline(),
            subtext = getSubtext(),
        )
    }

}