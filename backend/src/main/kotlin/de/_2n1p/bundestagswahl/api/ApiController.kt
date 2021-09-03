package de._2n1p.bundestagswahl.api

import de._2n1p.bundestagswahl.dto.ResultDto
import de._2n1p.bundestagswahl.exception.RessourceNotAvailibleException
import de._2n1p.bundestagswahl.service.ParserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.ZoneOffset


@RestController
@RequestMapping( "/api")
class ApiController(val parserService: ParserService) {

    @GetMapping("/result")
    fun results(): ResultDto {
        return parserService.result ?: throw RessourceNotAvailibleException()
    }

    @GetMapping("/lastupdate")
    fun lastUpdate():Long {
        return parserService.lastParse?.toEpochSecond(ZoneOffset.UTC) ?: throw RessourceNotAvailibleException()
    }


}
