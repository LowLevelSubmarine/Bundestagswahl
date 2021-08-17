import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Renderer2, ViewChild,
} from '@angular/core';
import {ChartElementDto} from "../../dto/chartElement.dto";
import {InfoBubbleDto} from "../../dto/InfoBubbleDto";
import {GroupDto, GroupValueDto} from "../../dto/group-dto";
import {OnLineDto} from "../../directives/line.directive";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ViewDimensions} from "./view-dimensions";
import {InfoBubbleComponent} from "../info-bubble/info-bubble.component";
import {GradientComponent} from "../gradient/gradient.component";
@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss'],
})
export class LinearGraphComponent  {

  @ViewChild(InfoBubbleComponent) infoBubble!: InfoBubbleComponent
  @ViewChild(GradientComponent) gradientComponent!: GradientComponent

  @Input()
  set data (elements: ChartElementDto[]) {
    this.buildGraph(elements)
  }
  uniPos: number[] = []
  groups: GroupDto[] = []
  xMaxValue = 20
  circleRadius = 4
  circleStroke = 2
  yMarker: number[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]

  viewDimensions = new ViewDimensions()

  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }



  buildGraph(elements: ChartElementDto[]) {
    let minValue = null
    let maxValue = null
    let groups: GroupDto[] = []
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
    this.uniPos = []

    for (let element of elements) {
      for (let serie of element.series) {
        let pos = (serie.position - minValue) / (maxValue - minValue)
        if (serie.value > maxYValue)  {
          maxYValue = serie.value
        }
        if (!this.uniPos.includes(pos)) {
          this.uniPos.push(pos)
        }

        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: serie.value, info: serie.info}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: serie.value, info: serie.info})
        }
      }
    }

    this.viewDimensions.yOffset = maxYValue
    this.groups = groups
  }

  getStrokeColor(group:any) {
    return `stroke:${group.color};`
  }

  getYScala(marker: number) {
    return this.viewDimensions.getY(marker)
  }
}
