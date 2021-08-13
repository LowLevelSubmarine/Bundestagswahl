package de._2n1p.bundestagswahl.utils

import de._2n1p.bundestagswahl.utils.Stream.Companion.min
import java.util.Optional
import java.util.stream.Stream

class Stream {
    companion object {

        fun<T, K : Comparable<K>> Stream<T>.min(comparable: (it: T) -> K): Optional<T> {
            return this.min { t1, t2 -> comparable(t1).compareTo(comparable(t2)) }
        }

        fun<T, K : Comparable<K>> Stream<T>.max(comparable: (it: T) -> K): Optional<T> {
            return this.max { t1, t2 -> comparable(t1).compareTo(comparable(t2)) }
        }

    }
}