import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {InfoBubbleDto} from "../dto/InfoBubbleDto";
import {GradientComponent} from "../components/gradient/gradient.component";
export interface OnLineDto{
  groupname: string
}



@Directive({
  selector: '[appLine]'
})
export class LineDirective {

  @Input() groupname: string =""
  @Input() gradient!: GradientComponent

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

}
