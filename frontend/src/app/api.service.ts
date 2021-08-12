import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ResultDto} from "./dto/result.dto";
import {Observable} from "rxjs";
import {ChartElementDto} from "./dto/chartElement.dto";
import {PartyColors} from "./party-colors";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  getData(): Observable<ResultDto> {
    return this.httpClient.get<ResultDto>(environment.api)
  }


  getChartData(from: Date | null = null, to: Date | null = null): Observable<ChartElementDto[]> {
    return new Observable<ChartElementDto[]>((observer) => {
      this.getData().subscribe((observable) => {
        let parties = new Map<number, ChartElementDto>()

        for (let point of observable.points) {
          let date = new Date(point.date)
          for (let [partyId, value] of Object.entries(point.value)) {
            let partyNum = Number(partyId)
            if (from && to && date >= from && date <= to || !from || !to) {
              if (parties.has(partyNum)) {
                parties.get(partyNum)!.series.push({name: date.toLocaleDateString(), value: value as number})
              } else {
                let partyName = observable.parties[partyNum]!.name
                let partyColor = PartyColors.getColorByParty(partyNum)
                parties.set(Number(partyId), {
                  name: partyName,
                  color: partyColor!,
                  series: [{name: date.toLocaleDateString(), value: value as number}]
                })
              }
            }
          }
        }

        observer.next(Array.from(parties.values()))
      })
    })
  }

}
