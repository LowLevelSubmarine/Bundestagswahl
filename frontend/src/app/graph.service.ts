import {Injectable, OnDestroy} from '@angular/core';
import {ResultDto} from "./dto/result.dto";
import {ChartElement, ChartElementGroup, YLines} from "./linear-graph/dto/chartElement.dto";
import {PartyColors} from "./party-colors";
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable, Observer, Subscriber} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private apiService: ApiService, private datePipe: DatePipe) {}


  getChartDataObserver(from: Date | undefined = undefined, to: Date | undefined = undefined) : Observable<ChartElement> {
    return new Observable(sub => {
      this.apiService.getDataObserver().subscribe((data) => {
        sub.next(this.calculateChartData(data,from,to))
      })
    })

  }

  private calculateChartData(result:ResultDto,from: Date | undefined = undefined, to: Date | undefined = undefined): ChartElement {
    let parties = new Map<number, ChartElementGroup>()
    for (let point of result.points) {
      let date = new Date(point.date)
      let formattedDate = this.datePipe.transform(date,"dd.MM.yyyy")!
      for (let [partyId, value] of Object.entries(point.values)) {
        let partyNum = Number(partyId)
        if (from && to && date >= from && date <= to || !from || !to) {
          if (parties.has(partyNum)) {
            parties.get(partyNum)!.points.push({name: formattedDate,position: date.getTime(), y: value as number, info: new Map([["prozent",value]])})
          } else {
            let partyName = result.parties[partyNum]!.shortcut
            let partyColor = PartyColors.getColorByParty(partyNum)
            parties.set(Number(partyId), {
              name: partyName,
              color: partyColor!,
              points: [{name: formattedDate, position: date.getTime(), y: value as number, info: new Map([["prozent",value]])}]
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


    return {chartGroups:Array.from(parties.values()),yLines:ylines}
  }
}
