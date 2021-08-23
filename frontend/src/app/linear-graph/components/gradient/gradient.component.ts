import {Component, Input, OnInit} from '@angular/core';
import {ChartElementGroup, ChartElementValue} from "../../dto/chartElement.dto";
import {GroupDto} from "../../dto/group-dto";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
// @ts-ignore
import * as viewDimensions from "../../../../../wasm";

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
      transition('*<=>void', animate('150ms')),
      transition('*<=>*', animate('150ms',keyframes([
        style({opacity:0}),
        style({opacity:25}),
        style({opacity:50}),
        style({opacity:75}),
        style({opacity:100})
      ]))),
    ]),
  ]
})
export class GradientComponent implements OnInit {

  /* string: Name of group| undefined: gidden*/
  gradient:string| undefined

  @Input() groups!: GroupDto[]
  @Input() viewDimensions!: viewDimensions.ViewDimensions

  constructor() { }

  ngOnInit(): void {
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
    result += `${this.viewDimensions.getX(group.values[group.values.length-1].position)},${this.viewDimensions.getY(0)} `
    result += `${this.viewDimensions.getX(group.values[0].position)},${this.viewDimensions.getY(0)} `
    return result
  }

}
