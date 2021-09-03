package de._2n1p.bundestagswahl.calc


interface Average<T : Number> {

    fun add(value: T)
    fun subtract(value: T)
    fun calc(): T
    fun getAmount(): Int

}