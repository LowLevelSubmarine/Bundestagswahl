import {Component, Input, OnInit} from '@angular/core';
import {OnLineDto} from "../../directives/line.directive";
import {ChartElementDto, ChartElementValue} from "../../dto/chartElement.dto";
import {GroupDto} from "../../dto/group-dto";
import {ViewDimensions} from "../linear-graph/view-dimensions";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'g[lchart-gradient]',
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.scss'],
  animations: [
    trigger('gradientAnim', [
      state('void', style({
        opacity: 0
      })),
      transition('void<=>*', animate('150ms')),
    ]),
  ]
})
export class GradientComponent implements OnInit {

  /* string: Name of group| undefined: gidden*/
  gradient:string| undefined

  @Input() groups!: GroupDto[]
  @Input() viewDimensions!: ViewDimensions

  constructor() { }

  ngOnInit(): void {
  }

  onLine($event: OnLineDto) {
    this.showGradient($event.groupname)
  }

  showGradient(name: string) {
    this.gradient = name
  }

  hideGradient() {
    this.gradient = undefined
  }

  getColorByGroup(name: string) {
    return this.groups.filter(it => it.group == name)[0].color
  }


  getGradientPointsForGroup(name: string) {
    let result = ""
    let group = this.groups.filter(it => it.group == name)[0]
    for (let point of group.values) {
      result += `${this.viewDimensions.getX(point.position)},${this.viewDimensions.getY(point.y)} `
    }
    result += `${this.viewDimensions.getX(group.values[group.values.length-1].position)},${(this.viewDimensions.svgHeight) -(this.viewDimensions.yOffset* this.viewDimensions.yMultiplier)} `
    result += `${this.viewDimensions.getX(group.values[0].position)},${(this.viewDimensions.svgHeight) -(this.viewDimensions.yOffset* this.viewDimensions.yMultiplier)} `
    return result
  }

}
