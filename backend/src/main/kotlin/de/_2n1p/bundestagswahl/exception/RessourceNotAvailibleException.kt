package de._2n1p.bundestagswahl.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
class RessourceNotAvailibleException : Exception()
