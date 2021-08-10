package de._2n1p.bundestagswahl.requests

import de._2n1p.bundestagswahl.service.HttpClientService

class DawumDbRequest (private val client: HttpClientService) {

    companion object {
        val API = "https://api.dawum.de"
    }

    fun fetch(): String {
        return client.getForUrl(API)
    }

}