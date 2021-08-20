import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ResultDto} from "./dto/result.dto";
import {Observable} from "rxjs";
import {ChartElement, ChartElementGroup, YLines} from "./linear-graph/dto/chartElement.dto";
import {PartyColors} from "./party-colors";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {

  }

  getData(): Observable<ResultDto> {
    return this.httpClient.get<ResultDto>(environment.api)
  }


  getChartData(from: Date | null = null, to: Date | null = null): Observable<ChartElement> {
    return new Observable<ChartElement>((observer) => {
      this.getData().subscribe((observable) => {
        let parties = new Map<number, ChartElementGroup>()

        for (let point of observable.points) {
          let date = new Date(point.date)
          let formattedDate = this.datePipe.transform(date,"dd.MM.yyyy")!
          for (let [partyId, value] of Object.entries(point.value)) {
            let partyNum = Number(partyId)
            if (from && to && date >= from && date <= to || !from || !to) {
              if (parties.has(partyNum)) {
                parties.get(partyNum)!.points.push({name: formattedDate,position: date.getTime(), y: value as number, info: new Map([["test1","test"]])})
              } else {
                let partyName = observable.parties[partyNum]!.shortcut
                let partyColor = PartyColors.getColorByParty(partyNum)
                parties.set(Number(partyId), {
                  name: partyName,
                  color: partyColor!,
                  points: [{name: formattedDate, position: date.getTime(), y: value as number, info: new Map([["test1","test"]])}]
                })
              }
            }
          }
        }
        //TODO: Refactor pls
        let ylines:YLines[] = []
        for (let i = 0; i<=20;i++) {
          ylines.push({position:i*5,name:String(i*5)+"%",stroke:i==1?3:undefined})
        }


        observer.next({chartGroups:Array.from(parties.values()),yLines:ylines})
      })
    })
  }

}
