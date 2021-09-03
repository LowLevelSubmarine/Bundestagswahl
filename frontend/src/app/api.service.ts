import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ResultDto} from "./dto/result.dto";
import {BehaviorSubject, observable, Observable, Subject, Subscriber} from "rxjs";
import {ChartElement, ChartElementGroup, YLines} from "./linear-graph/dto/chartElement.dto";
import {PartyColors} from "./party-colors";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy{

  private lastParseTimestamp: number = 0
  private interval:number| undefined = undefined
  private lastResponse: ResultDto | undefined
  private resultSubscriber: Subscriber<ResultDto>[] = []


  constructor(private httpClient: HttpClient) {
    this.onInit()
  }

  private parseData(): Observable<ResultDto> {
    return this.httpClient.get<ResultDto>(environment.api+"/result")
  }

  private parseLastUpdate(): void {
    this.httpClient.get<number>(environment.api+"/lastupdate").subscribe((res) =>{
      if (!this.lastParseTimestamp || this.lastParseTimestamp < res) {
        this.fetchUpdate()
        this.lastParseTimestamp = res
      }
    })
  }

  private fetchUpdate(): void {
    this.parseData().subscribe(((parseResult) => {
      this.resultSubscriber.forEach(sub => sub.next(parseResult))
      this.lastResponse = parseResult
      console.log("Loaded result from Api: "+Date.now())
    }))
  }

  private onInit(): void {
    this.parseLastUpdate()

    this.interval = setInterval(() => {
      this.parseLastUpdate()
    },30000)
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.resultSubscriber.forEach(sub => sub.complete())
  }

  // --- Public Stuff ---

  getDataObserver():Observable<ResultDto> {
    return new Observable((sub) => {
      if (this.lastResponse) {
        sub.next(this.lastResponse)
      }
      this.resultSubscriber.push(sub)
    })
  }

}
