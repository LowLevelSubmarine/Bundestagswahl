import {ChangeDetectorRef, Component} from '@angular/core';
import {ApiService} from "./api.service";
import {ChartElementDto} from "./dto/chartElement.dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  data: ChartElementDto[] | null = null
  from: any
  to: any


  constructor(private apiService: ApiService, private changeDetection: ChangeDetectorRef) {
    this.apiService.getChartData().subscribe((observer) => {

      this.data = observer
      changeDetection.detectChanges()
    })
  }


  applyDates() {
    console.log(this.from)
    this.apiService.getChartData(new Date(this.from), new Date(this.to)).subscribe((observer) => {
      this.data = observer
      this.changeDetection.detectChanges()
    })
  }
}
