import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ChartElementDto} from "../../dto/chartElement.dto";
import *  as d3 from "d3"
import {select} from "d3-selection";
@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss']
})
export class LinearGraphComponent implements OnInit {

  @Input()
  set data (elements: ChartElementDto[]) {
    this.buildGraph(elements)
  }
  groups: {group:string, color: string,values:{position: number, x:any,y:any}[]}[] = []

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  buildGraph(elements: ChartElementDto[]) {
    let minValue = null
    let maxValue = null
    let groups: {group:string, color: string,values:{position: number, x:any,y:any}[]}[] = []
    let names: string[] = []

    for (let element of elements) {
      if (!names.includes(element.name)) {
        names.push(element.name)
      }
      for (let serie of element.series) {
        if (maxValue == null ||serie.position> maxValue) {
          maxValue = serie.position
        }

        if (minValue == null ||serie.position< minValue) {
          minValue = serie.position
        }

      }
    }

    if (!minValue || !maxValue) {
      return
    }


    for (let element of elements) {
      for (let serie of element.series) {
        let pos = (serie.position - minValue) / (maxValue - minValue)
        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: serie.value}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: serie.value})
        }
      }
    }

    this.groups = groups

    let xMultiplier = 500
    let yMultiplier = 2
    const xOffset = 5


    let svg = select("#svgContainer").append("svg").attr("width", 1000).attr("height", 100);
    let dates: string[] = []


    for (let groupIndex in groups) {
      for (let point of groups[groupIndex].values) {
        if (!dates.includes(point.x)) {
          dates.push(point.x)
        }

        svg.append("circle")
        .attr("cx",String(point.position * xMultiplier)+xOffset)
        .attr("r","4")
        .attr("cy",100-(point.y * yMultiplier))
        .attr("fill",groups[groupIndex].color)
      }

    }
    console.log(dates.length)

    console.log(groups)
  }

}


/*



    let maxValue = 0
    let startDay: null| Date = null
    let endDay: null| Date = null

    for (let element of elements) {
      for (let serie of element.series) {
        if (endDay == null ||serie.name > endDay) {
          endDay = serie.name
        }

        if (startDay == null || serie.name < startDay) {
          startDay = serie.name
        }
      }
    }
    if (!startDay || !endDay) {
      return
    }
    let duration = Math.ceil(Math.abs(endDay.getTime()-startDay.getTime())/ (1000 * 3600 * 24))
 */
