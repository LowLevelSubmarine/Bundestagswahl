import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {InfoBubbleDto} from "../components/linear-graph/InfoBubbleDto";
export interface OnLineDto{
  groupname: string
}



@Directive({
  selector: '[appLine]'
})
export class LineDirective {

  @Input() groupname: string =""
  @Output() onMouseOver:EventEmitter<OnLineDto> =new EventEmitter<OnLineDto>();
  @Output() onMouseOut:EventEmitter<never> =new EventEmitter<never>();

  @HostListener("mouseenter") onMouseEnter() {

    this.onMouseOver.emit({groupname: this.groupname})
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.onMouseOut.emit()
  }

  constructor() { }

}
