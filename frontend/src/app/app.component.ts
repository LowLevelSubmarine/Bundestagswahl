import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartElementDto} from "./linear-graph/dto/chartElement.dto";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'frontend';
  data: ChartElementDto[]  = []
  from = this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), "yyyy-MM-dd")!
  to = this.datePipe.transform(new Date(), "yyyy-MM-dd")!

  constructor(private apiService: ApiService, private changeDetection: ChangeDetectorRef, private datePipe: DatePipe) {
    this.applyDates()
  }

  applyDates() {
    this.apiService.getChartData(new Date(this.from), new Date(this.to)).subscribe((observer) => {
      this.data = observer
      this.changeDetection.detectChanges()
    })
  }


}
