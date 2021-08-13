import {Component, Input, OnInit} from '@angular/core';
import {ColorHelper, ScaleType} from "@swimlane/ngx-charts";
import {ChartElementDto} from "../../linear-graph/dto/chartElement.dto";

@Component({
  selector: 'app-point-graph',
  templateUrl: './point-graph.component.html',
  styleUrls: ['./point-graph.component.scss']
})

export class PointGraphComponent {

  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  timeline: boolean = true;


  _data: ChartElementDto[] | null = null;

  @Input()
  set data(data: ChartElementDto[]| null) {
    if (data) {
      this.colorScheme.domain = []
      for (let element of data) {
        this.colorScheme.domain.push(element.color)
      }
      this._data = data
    }
  }
  get data():ChartElementDto[]| null {
    return this._data
  }


  colorScheme:{domain: string[]} = {
    domain: []
  };


}
