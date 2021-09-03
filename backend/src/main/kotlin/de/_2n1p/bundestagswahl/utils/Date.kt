package de._2n1p.bundestagswahl.utils

import de._2n1p.bundestagswahl.utils.Number.Companion.isBetween
import java.time.LocalDate

class Date {
    companion object {
        fun LocalDate.isBetween(x: LocalDate, y: LocalDate): Boolean {
            return (this.isAfter(x) == this.isBefore(y)) || this == x || this == y
        }
        fun LocalDate.inRange(date: LocalDate, range: Int): Boolean {
            val epochDay = date.toEpochDay()
            return this.toEpochDay().isBetween(epochDay-range, epochDay+range)
        }
    }
}