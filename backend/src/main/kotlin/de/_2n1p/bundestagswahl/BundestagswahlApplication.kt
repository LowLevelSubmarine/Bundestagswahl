package de._2n1p.bundestagswahl

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
