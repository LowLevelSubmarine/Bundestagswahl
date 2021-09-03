import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartElement, ChartElementGroup} from "./linear-graph/dto/chartElement.dto";
import {DatePipe} from "@angular/common";
import {Party} from "./dto/party.dto";
import {async} from "rxjs";
import {ParliamentCompositionElement} from "./components/parliament-composition/parliament-composition.component";
import {PartyColors} from "./party-colors";
import {Changes} from "./dto/changes.dto";
import {GraphService} from "./graph.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'frontend';
  highlightedGroup: string| undefined = undefined
  changes: Changes | undefined
  seatDistribution: ParliamentCompositionElement[] = []
  from = this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), "yyyy-MM-dd")!
  to = this.datePipe.transform(new Date(), "yyyy-MM-dd")!
  data = this.chartService.getChartDataObserver(new Date(this.from), new Date(this.to))

  constructor(private apiService: ApiService, private changeDetection: ChangeDetectorRef, private datePipe: DatePipe, private chartService: GraphService) {
    this.applyDates()
    this.apiService.getDataObserver().subscribe((data) => {
      this.changes = data.changes
      let dist: ParliamentCompositionElement[] = []
      for (let [key, value] of Object.entries(data.seatDistribution)) {
        dist.push({seats: value, color: PartyColors.getColorByParty(Number(key))})
      }
      this.seatDistribution = dist
    })
  }

  applyDates() {
    this.data = this.chartService.getChartDataObserver(new Date(this.from), new Date(this.to))
  }


  onPartySelect($event: Party) {
    this.highlightedGroup  = $event.shortcut
    console.log($event)
  }
}
