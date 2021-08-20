import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartElement, ChartElementGroup} from "./linear-graph/dto/chartElement.dto";
import {DatePipe} from "@angular/common";
import {Party} from "./dto/party.dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'frontend';
  data: ChartElement|undefined = undefined
  highlightedGroup: string| undefined = undefined
  from = this.datePipe.transform(new Date().setDate(new Date().getDate() - 90), "yyyy-MM-dd")!
  to = this.datePipe.transform(new Date(), "yyyy-MM-dd")!

  constructor(private apiService: ApiService, private changeDetection: ChangeDetectorRef, private datePipe: DatePipe) {
    this.applyDates()
  }

  applyDates() {
    this.apiService.getChartData(new Date(this.from), new Date(this.to)).subscribe((observer) => {
      this.data = observer
    })
  }


  onPartySelect($event: Party) {
    this.highlightedGroup  = $event.shortcut
    console.log($event)
  }
}
