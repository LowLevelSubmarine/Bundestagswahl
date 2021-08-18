import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, HostListener,
  Input,
  Renderer2, ViewChild,
} from '@angular/core';
import {ChartElementDto} from "../../dto/chartElement.dto";
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
  set data (elements: ChartElementDto[]) {
    this._date = elements
    this.buildGraph(elements)
  }
  _date: ChartElementDto[] = []
  uniPos: number[] = []
  groups: GroupDto[] = []
  xMaxValue = 20
  circleRadius = 4
  circleStroke = 2
  yMarker: number[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]

  viewDimensions = new ViewDimensions()

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  @HostListener("window:resize",['$event'])
  onresize($event: any) {
      this.viewDimensions.svgHeight = this.svgContainer.nativeElement.offsetHeight
      this.viewDimensions.svgWidth = this.svgContainer.nativeElement.offsetWidth
      this.viewDimensions.recalculateViewDimensions()
      this.buildGraph(this._date)
  }

  ngAfterViewInit() {
    this.viewDimensions.svgHeight = this.svgContainer.nativeElement.offsetHeight
    this.viewDimensions.svgWidth = this.svgContainer.nativeElement.offsetWidth
    this.viewDimensions.recalculateViewDimensions()
  }



  buildGraph(elements: ChartElementDto[]) {
    let minValueX = null
    let maxValueX = null
    let minValueY = null
    let maxValueY = null
    let groups: GroupDto[] = []
    let names: string[] = []

    for (let element of elements) {
      if (!names.includes(element.name)) {
        names.push(element.name)
      }
      for (let serie of element.series) {
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

    for (let element of elements) {
      for (let serie of element.series) {
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

    this.viewDimensions.yPadding = 0
    this.groups = groups
  }

  getStrokeColor(group:any) {
    return `stroke:${group.color};`
  }

  getYScala(marker: number) {
    return this.viewDimensions.getY(marker)
  }
}
