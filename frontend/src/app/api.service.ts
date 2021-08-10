import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ResultDto} from "./dto/result.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  getData(): Observable<ResultDto> {
      return this.httpClient.get<ResultDto>(environment.api)
  }


}
