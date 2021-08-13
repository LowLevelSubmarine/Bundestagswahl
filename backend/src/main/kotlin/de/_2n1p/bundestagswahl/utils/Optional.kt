package de._2n1p.bundestagswahl.utils

import java.util.Optional

class Optional {
    companion object {
        fun <T> Optional<T>.orNull(): T? {
            return this.orElse(null)
        }
    }
}