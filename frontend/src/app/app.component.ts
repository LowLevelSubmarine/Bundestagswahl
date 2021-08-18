import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartElementDto} from "./linear-graph/dto/chartElement.dto";
import {DatePipe} from "@angular/common";
import {async} from "rxjs";
import {ParliamentCompositionElement} from "./components/parliament-composition/parliament-composition.component";
import {PartyColors} from "./party-colors";
import {Today} from "./dto/today.dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'frontend';
  data: ChartElementDto[]  = []
  today: Today | undefined
  seatDistribution: ParliamentCompositionElement[] = []
  from = this.datePipe.transform(new Date().setDate(new Date().getDate() - 90), "yyyy-MM-dd")!
  to = this.datePipe.transform(new Date(), "yyyy-MM-dd")!

  constructor(private apiService: ApiService, private changeDetection: ChangeDetectorRef, private datePipe: DatePipe) {
    this.applyDates()
    this.apiService.getData().subscribe((data) => {
      this.today = data.today
      let dist: ParliamentCompositionElement[] = []
      console.log(data.seatDistribution)
      for (let [key, value] of Object.entries(data.seatDistribution)) {
        dist.push({seats: value, color: PartyColors.getColorByParty(Number(key))})
      }
      this.seatDistribution = dist
    })
  }

  applyDates() {
    this.apiService.getChartData(new Date(this.from), new Date(this.to)).subscribe((observer) => {
      this.data = observer
      this.changeDetection.detectChanges()
    })
  }

}
