package de._2n1p.bundestagswahl.service

import de._2n1p.bundestagswahl.exception.HttpException
import okhttp3.Call
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.springframework.stereotype.Service
import java.nio.charset.StandardCharsets
import kotlin.jvm.Throws


@Service
class HttpClientService(val okHttpClient: OkHttpClient = OkHttpClient()) {

    fun getForUrl(url:String): String {
        val request: Request = Request.Builder()
            .url(url)
            .build()

        val call: Call = okHttpClient.newCall(request)
        val response: Response = call.execute()
        return response.body?.byteStream()?.readAllBytes()?.toString(StandardCharsets.UTF_8) ?: throw HttpException()
    }

}
