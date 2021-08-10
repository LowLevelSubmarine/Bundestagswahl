package de._2n1p.bundestagswahl

import de._2n1p.bundestagswahl.data.Dawum
import de._2n1p.bundestagswahl.requests.DawumDbRequest
import de._2n1p.bundestagswahl.service.HttpClientService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling


fun main(args: Array<String>) {
	runApplication<BundestagswahlApplication>(*args)
}

@EnableScheduling
@SpringBootApplication
class BundestagswahlApplication {

	private val client = HttpClientService()
	private lateinit var dawum: Dawum

	init {
		updateDawum()
		println(dawum.surveys.size)
	}

	private fun updateDawum() {
		dawum = Dawum(DawumDbRequest(client).fetch())
	}

}