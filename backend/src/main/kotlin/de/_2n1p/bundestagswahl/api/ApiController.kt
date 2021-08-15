package de._2n1p.bundestagswahl.api

import de._2n1p.bundestagswahl.dawum_dto.ResultDto
import de._2n1p.bundestagswahl.exception.RessourceNotAvailibleException
import de._2n1p.bundestagswahl.service.ParserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping( "/api")
class ApiController(val parserService: ParserService) {

    @GetMapping("/result")
    fun results(): ResultDto {
        return parserService.result ?: throw RessourceNotAvailibleException()
    }


}
