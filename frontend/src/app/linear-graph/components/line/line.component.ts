import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GradientComponent} from "../gradient/gradient.component";

@Component({
  selector: 'g[lchart-line]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() groupname: string =""
  @Input() gradient!: GradientComponent
  @Input() x1! :number
  @Input() x2! :number
  @Input() y1! :number
  @Input() y2! :number
  @Input() color!: string
  stroke = 2
  strokeLarge = 500


  @HostListener("mouseenter") onMouseEnter() {
    this.gradient.showGradient(this.groupname)
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.gradient.hideGradient()
  }

  @HostListener("click") click() {
    if (this.gradient.gradient == undefined) {
      this.gradient.showGradient(this.groupname)
    } else {
      this.gradient.hideGradient()
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
