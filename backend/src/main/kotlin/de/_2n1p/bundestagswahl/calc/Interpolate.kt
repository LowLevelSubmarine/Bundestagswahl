package de._2n1p.bundestagswahl.calc

class Interpolate {

    companion object {

        fun linear(x: Float, y: Float, pos: Float): Float {
            return x*(1-pos) + y*pos
        }

    }

}