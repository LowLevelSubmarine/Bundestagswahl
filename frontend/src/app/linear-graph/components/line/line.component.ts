import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GradientComponent} from "../gradient/gradient.component";
import {GroupDto} from "../../dto/group-dto";
import {ViewDimensions} from "../linear-graph/view-dimensions";

@Component({
  selector: 'g[lchart-line]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() gradient!: GradientComponent
  @Input() viewDimensions!: ViewDimensions
  @Input() group!: GroupDto
  stroke = 2
  strokeLarge = 10


  @HostListener("mouseenter") onMouseEnter() {
    this.gradient.showGradient(this.group.group)
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.gradient.hideGradient()
  }

  @HostListener("click") click() {
    if (this.gradient.gradient == undefined) {
      this.gradient.showGradient(this.group.group)
    } else {
      this.gradient.hideGradient()
    }
  }

  getPolyLineCoords(group: GroupDto): string {
    let string = "";
    for (let point of group.values) {
      string += `${this.viewDimensions.getX(point.position)},${this.viewDimensions.getY(point.y)} `
    }
    return string
  }

  buildStyle(): string {
    return  `fill:none; stroke:${this.group.color}; stroke-width: ${this.stroke};`
  }

  buildStyleHoverLayer() {
    return  `fill:none; stroke:#FF000000; stroke-width: ${this.strokeLarge};`
  }

  constructor() { }

  ngOnInit(): void {
  }

}
