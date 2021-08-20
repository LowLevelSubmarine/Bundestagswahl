package de._2n1p.bundestagswahl.calc

import java.lang.Math.round

class SeatDistribution(val seats: Int, val barrier: Float) {

    fun calc(parties: Map<Long, Float>): Map<Long, Int> {
        return parties.filter { it.value > barrier && it.key != 0L }.mapValues { round(it.value / 100 * seats) }
    }

}