package de._2n1p.bundestagswahl.calc

import java.lang.Math.round

class SeatDistribution(val seats: Int, val barrier: Float) {

    fun calc(parties: Map<Long, Float>): Map<Long, Int> {
        val filteredParties = parties.filter { it.value > barrier && it.key != 0L }
        var sum = 0F
        filteredParties.forEach { sum += it.value }
        return filteredParties.mapValues { round(it.value / sum * seats) }
    }

}