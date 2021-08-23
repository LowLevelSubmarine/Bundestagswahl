import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, HostListener,
  Input, OnInit,
  Renderer2, ViewChild,
} from '@angular/core';
import {ChartElement, ChartElementGroup, YLines} from "../../dto/chartElement.dto";
import {GroupDto, GroupValueDto} from "../../dto/group-dto";
import {InfoBubbleComponent} from "../info-bubble/info-bubble.component";
import {GradientComponent} from "../gradient/gradient.component";
import {ViewDimensionsService} from "../../service/view-dimensions.service";
import {ViewDimensions} from "char-wasm";
import {BehaviorSubject, Observable, Subject, Subscriber} from "rxjs";
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
      if (this.viewDimensions) {
        this.buildGraph(elements)
      }
    }
  }

  @Input()
  set highlitedGroup(name: string| undefined) {
    if (name) {
      this.gradientComponent.showGradient(name)
    } else if (this.gradientComponent) {
      this.gradientComponent.hideGradient()

    }
  }
  _data!: ChartElement
  uniPos: { pos:number, name:string }[] = []
  groups: GroupDto[] = []
  circleRadius = 4
  circleStroke = 2
  yMarker: YLines[] = []
  showCircles = true
  bigDataSet = false

  viewDimensions!: ViewDimensions
  ready = false

  constructor(private viewDimensionService: ViewDimensionsService, private changeDetection: ChangeDetectorRef) {

  }

  @HostListener("window:resize",['$event'])
  onresize($event: any) {
      this.viewDimensions.svgHeight = this.svgContainer.nativeElement.parentElement.offsetHeight
      this.infoBubble.closeBubble()
      this.viewDimensions.svgWidth = this.svgContainer.nativeElement.parentElement.offsetWidth
      this.viewDimensions.recalculateViewDimensions()
      if (this.viewDimensions.xMultiplier<=290) {
        this.showCircles = false
      } else if (!this.bigDataSet) {
        this.showCircles = true
      }
  }


  ngAfterViewInit() {
    this.viewDimensionService.viewDimensions().then(res => {
      this.viewDimensions = res
      this.ready = true
      this.changeDetection.detectChanges()
      if (this._data) {
        this.viewDimensions.svgHeight= this.svgContainer.nativeElement.parentElement.offsetHeight
        this.viewDimensions.svgWidth = this.svgContainer.nativeElement.parentElement.offsetWidth
        this.viewDimensions.recalculateViewDimensions()
        this.buildGraph(this._data)
      }
    })
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
}
