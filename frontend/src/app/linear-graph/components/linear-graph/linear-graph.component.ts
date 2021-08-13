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
  uniPos: number[] = []
  groups: {group:string, color: string,values:{position: number, x:any,y:any, info:string | undefined,index: number}[]}[] = []
  xMultiplier = 500
  yMultiplier = 7
  xOffset = 10
  circleRadius = 4
  circleStroke = 2
  svgWidth = 1000
  svgHeight = 500
  yMarker: number[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
  yMarkerUnit = "%"
  yMaxValue = 100

  xMaxValue = 20

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  buildGraph(elements: ChartElementDto[]) {
    let minValue = null
    let maxValue = null
    let groups: {group:string, color: string,values:{position: number, info: string| undefined, x:any,y:any, index: number}[]}[] = []
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


    let maxYValue = 0

    for (let element of elements) {
      let index = 0
      for (let serie of element.series) {
        let pos = (serie.position - minValue) / (maxValue - minValue)
        if (serie.value > maxYValue)  {
          maxYValue = serie.value
        }
        if (!this.uniPos.includes(pos)) {
          this.uniPos.push(pos)
        }

        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: serie.value, info: serie.info, index:index}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: serie.value, info: serie.info, index:index})
        }
        index++
      }
    }

    this.yMaxValue = maxYValue
    console.log(this.yMaxValue)
    this.groups = groups
  }

  getX(point: any) {
    return (point.position * this.xMultiplier)+this.xOffset
  }

  getY(point:any) {
    return (this.svgHeight-(point.y * this.yMultiplier)) -(this.yMaxValue* this.yMultiplier)
  }

  getStrokeColor(group:any) {
    return `stroke:${group.color};`
  }

  getYScala(marker: number) {
    return (this.svgHeight-(marker * this.yMultiplier)) -(this.yMaxValue* this.yMultiplier)
  }
}
