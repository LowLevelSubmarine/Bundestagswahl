package de._2n1p.bundestagswahl.api

import de._2n1p.bundestagswahl.dto.Tasker
import de._2n1p.bundestagswahl.service.HttpClientService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping( "/api")
class ApiController() {

    @GetMapping("test")
    fun test(): Tasker {
        return Tasker(15,"name")
    }

}
