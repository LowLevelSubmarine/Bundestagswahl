package de._2n1p.bundestagswahl.calc

class FloatAverage : Average<Float> {

    private var value = 0F
    private var amount = 0
    private var cache: Float? = 0F

    @Synchronized
    override fun add(value: Float) {
        this.value += value
        this.amount++
        this.cache = null
    }

    @Synchronized
    override fun subtract(value: Float) {
        this.value -= value
        this.amount--
        this.cache = null
    }

    @Synchronized
    override fun calc(): Float {
        if (this.cache == null) this.cache = if (this.amount != 0) this.value / this.amount else 0F
        return this.cache!!
    }

    override fun getAmount(): Int {
        return this.amount
    }

    companion object {

        fun <K, V : Number> Map<K, Average<V>>.calcAverages(): Map<K, V> {
            return this.mapValues { it.value.calc() }
        }

    }

}