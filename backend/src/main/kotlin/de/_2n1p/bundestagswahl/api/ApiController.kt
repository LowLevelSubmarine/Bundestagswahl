package de._2n1p.bundestagswahl.api

import de._2n1p.bundestagswahl.data.Dawum
import de._2n1p.bundestagswahl.dto.ResultDto
import de._2n1p.bundestagswahl.dto.SurveyPoint
import de._2n1p.bundestagswahl.dto.Tasker
import de._2n1p.bundestagswahl.exception.RessourceNotAvailibleException
import de._2n1p.bundestagswahl.service.HttpClientService
import de._2n1p.bundestagswahl.service.ParserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate


@RestController
@RequestMapping( "/api")
class ApiController(val parserService: ParserService) {

    @GetMapping("/result")
    fun results(): ResultDto {
        return ResultDto(listOf(SurveyPoint(LocalDate.now(),5f,"LOL","BILD")))
    }


}
