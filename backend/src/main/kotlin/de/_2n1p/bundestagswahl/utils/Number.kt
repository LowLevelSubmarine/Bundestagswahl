package de._2n1p.bundestagswahl.utils

class Number {
    companion object {

        fun Long.isBetween(x: Long, y: Long): Boolean {
            return this > x == y < this
        }

    }
}