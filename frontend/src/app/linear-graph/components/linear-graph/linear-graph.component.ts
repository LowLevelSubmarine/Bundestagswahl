import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, HostListener,
  Input,
  Renderer2, ViewChild,
} from '@angular/core';
import {ChartElement, ChartElementGroup, YLines} from "../../dto/chartElement.dto";
import {GroupDto, GroupValueDto} from "../../dto/group-dto";
import {ViewDimensions} from "./view-dimensions";
import {InfoBubbleComponent} from "../info-bubble/info-bubble.component";
import {GradientComponent} from "../gradient/gradient.component";
import {MarkerDto} from "../../dto/marker.dto";
@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss'],
})
export class LinearGraphComponent implements AfterViewInit {

  @ViewChild(InfoBubbleComponent) infoBubble!: InfoBubbleComponent
  @ViewChild(GradientComponent) gradientComponent!: GradientComponent
  @ViewChild("svgContainer") svgContainer!: ElementRef

  @Input()
  set data (elements: ChartElement| null) {
    if (elements) {
      this._data = elements
      this.buildGraph(elements)
    }
  }

  @Input()
  set highlightedGroup(name: string| undefined) {
    if (name) {
      this.gradientComponent.showGradient(name)
    } else if (this.gradientComponent) {
      this.gradientComponent.hideGradient()

    }
  }
  @Input()
  minYValue: undefined | number = undefined
  _data!: ChartElement
  uniPos: MarkerDto[] = []
  groups: GroupDto[] = []
  circleRadius = 4
  circleStroke = 2
  yMarker: YLines[] = []
  showCircles = true
  bigDataSet = false

  viewDimensions = new ViewDimensions()

  lastDate: number| undefined = undefined
  dateWidth = 0

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  @HostListener("window:resize",['$event'])
  onresize($event: any) {
      //TODO: fix: this.viewDimensions.svgHeight = this.svgContainer.nativeElement.offsetHeight
      this.infoBubble.closeBubble()
      this.viewDimensions.svgWidth = this.svgContainer.nativeElement.offsetWidth
      this.viewDimensions.recalculateViewDimensions()
      if (this.viewDimensions.xMultiplier<=290) {
        this.showCircles = false
      } else if (!this.bigDataSet) {
        this.showCircles = true
      }
  }

  ngAfterViewInit() {
    this.viewDimensions.svgHeight = this.svgContainer.nativeElement.offsetHeight
    this.viewDimensions.svgWidth = this.svgContainer.nativeElement.offsetWidth
    this.viewDimensions.recalculateViewDimensions()
  }



  buildGraph(chartElement: ChartElement) {
    let minValueX = null
    let maxValueX = null
    let minValueY = null
    let maxValueY = null
    let groups: GroupDto[] = []
    let names: string[] = []

    for (let element of chartElement.chartGroups) {
      if (!names.includes(element.name)) {
        names.push(element.name)
      }
      for (let serie of element.points) {
        if (maxValueX == null ||serie.position> maxValueX) {
          maxValueX = serie.position
        }

        if (maxValueY == null ||serie.y > maxValueY) {
          maxValueY = serie.y
        }

        if (minValueX == null ||serie.position< minValueX) {
          minValueX = serie.position
        }
        if (minValueY == null ||serie.y< minValueY) {
          minValueY = serie.y
        }


      }
    }

    if (!minValueX || !maxValueX || !maxValueY || !minValueY) {
      return
    }

    if (this.minYValue != undefined) minValueY = this.minYValue

    this.uniPos = []

    for (let element of chartElement.chartGroups) {
      if (element.points.length > this.viewDimensions.xMultiplier) {
        this.bigDataSet = true
        this.showCircles = false
      }


      for (let serie of element.points) {
        let pos = (serie.position - minValueX) / (maxValueX - minValueX)
        let newY = (serie.y - minValueY) / (maxValueY - minValueY)

        if (this.uniPos.filter((it) => it.pos == pos).length == 0) {
          this.uniPos.push({pos:pos,name:serie.name})
        }

        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: newY, info: serie.info}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: newY, info: serie.info})
        }
      }
    }

    let yMarker = []
    for (const yLine of chartElement.yLines) {
      yMarker.push({position:(yLine.position - minValueY) / (maxValueY - minValueY),name:yLine.name, stroke: yLine.stroke})
    }
    this.yMarker = yMarker

    this.groups = groups
  }

  getStrokeColor(color:string) {
    return `stroke:${color};`
  }

  isShowDate(pos: number): boolean {
    const margin = 20
    const lastElements = document.getElementsByClassName("xText")
     if (lastElements.length == 0) {
       return true
     } else {
       const lastElement = lastElements[lastElements.length-1]
       const width = lastElements[0].getBoundingClientRect().width;
       const x = (<any>lastElement).x.baseVal[0].value
       if (this.viewDimensions.getX(pos) > x+width+margin && this.viewDimensions.getX(pos) +width < this.viewDimensions.svgWidth) {
         return true
       } else  {
         return false
       }
     }
  }
}
