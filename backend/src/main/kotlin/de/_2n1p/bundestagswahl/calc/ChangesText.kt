package de._2n1p.bundestagswahl.calc

import de._2n1p.bundestagswahl.dawum.dto.Dawum
import de._2n1p.bundestagswahl.dto.DataPoint
import de._2n1p.bundestagswahl.dto.Changes
import java.lang.Math.abs
import java.lang.RuntimeException

class ChangesText(val fromDataPoint: DataPoint, val toDataPoint: DataPoint, val dawum: Dawum) {

    init {
        if (this.fromDataPoint.surveys.isEmpty()) throw RuntimeException("DataPoint must consist of at least one survey!")
    }

    fun getHeadline(): String {
        val instituteText = this.toDataPoint.surveys.joinToString(", ") { survey -> this.dawum.institutes[survey.instituteId]!!.name}
        return if (this.toDataPoint.surveys.size == 1) "Neue Studie: $instituteText" else "Neue Studien: $instituteText."
    }

    fun getSubtext(): String {
        val partyIds = fromDataPoint.values.keys.union(toDataPoint.values.keys)
        val partyChanges = partyIds.map { PartyChange(fromDataPoint.values[it], toDataPoint.values[it], it) }.sortedBy { -it.calcSignificance() }
        return partyChanges.joinToString(", ") { it.toString()}
    }

    inner class PartyChange(val from: Float?, val to: Float?, val partyId: Long) {

        val change: Float? = if (from != null && to != null) to - from else null

        @Override
        override fun toString(): String {
            val partyName = this@ChangesText.dawum.parties[partyId]!!.shortcut
            if (this.change != null) return partyName + " " + "%+.1f".format(change) + "%"
            else if (this.to == null) return "$partyName nicht mehr gezählt"
            else if (this.from == null ) return "$partyName wird wieder gezählt"
            return ""
        }

        fun calcSignificance(): Float {
            return abs(this.change ?: 1F)
        }

    }

    fun getToday(): Changes {
        return Changes(
            headline = getHeadline(),
            subtext = getSubtext(),
        )
    }

}