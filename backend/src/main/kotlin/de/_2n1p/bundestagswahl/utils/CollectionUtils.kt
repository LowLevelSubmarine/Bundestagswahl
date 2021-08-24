package de._2n1p.bundestagswahl.utils

class CollectionUtils {
    companion object {

        inline fun <T> Collection<T>.collectBy(crossinline transform: (T) -> Float): Float {
            var sum = 0F
            this.forEach { sum += transform(it) }
            return sum
        }

    }
}