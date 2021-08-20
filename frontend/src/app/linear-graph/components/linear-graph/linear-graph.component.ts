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
  set data (elements: ChartElement| undefined) {
    if (elements) {
      this._data = elements
      this.buildGraph(elements)
    }
  }

  @Input()
  set highlitedGroup(name: string| undefined) {
    if (name) {
      console.log(this._data)
      this.gradientComponent.showGradient(name)
    } else {
      this.gradientComponent.hideGradient()

    }
  }
  _data!: ChartElement
  uniPos: number[] = []
  groups: GroupDto[] = []
  circleRadius = 4
  circleStroke = 2
  yMarker: YLines[] = []

  viewDimensions = new ViewDimensions()

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  @HostListener("window:resize",['$event'])
  onresize($event: any) {
      this.viewDimensions.svgHeight = this.svgContainer.nativeElement.offsetHeight
      this.viewDimensions.svgWidth = this.svgContainer.nativeElement.offsetWidth
      this.viewDimensions.recalculateViewDimensions()
      this.infoBubble.closeBubble()
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


    this.uniPos = []

    for (let element of chartElement.chartGroups) {
      for (let serie of element.points) {
        let pos = (serie.position - minValueX) / (maxValueX - minValueX)
        let newY = (serie.y - minValueY) / (maxValueY - minValueY)

        if (!this.uniPos.includes(pos)) {
          this.uniPos.push(pos)
        }

        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: newY, info: serie.info}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: newY, info: serie.info})
        }
      }
    }

    for (const yLine of chartElement.yLines) {
      this.yMarker.push({position:(yLine.position - minValueY) / (maxValueY - minValueY),name:yLine.name, stroke: yLine.stroke})
    }

    this.groups = groups
  }

  getStrokeColor(color:string) {
    return `stroke:${color};`
  }
}
