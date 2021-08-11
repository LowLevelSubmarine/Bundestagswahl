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

}
