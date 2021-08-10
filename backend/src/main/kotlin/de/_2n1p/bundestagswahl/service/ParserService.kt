package de._2n1p.bundestagswahl.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component


@Component
class ParserService {

    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Scheduled(fixedDelay = 30000)
    fun parse() {
        logger.info("LOL")
    }
}
