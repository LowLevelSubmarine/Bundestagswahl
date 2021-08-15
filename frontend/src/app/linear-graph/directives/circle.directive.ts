import {
  ComponentFactoryResolver,
  Directive,
  ElementRef, EventEmitter,
  HostListener,
  Inject, Input,
  Output,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subject, Subscriber} from "rxjs";
import {InfoBubbleDto} from "../components/linear-graph/InfoBubbleDto";

@Directive({
  selector: 'circle[appCircle]'
})
export class CircleDirective {
  @Input() info :Map<string,string> =new Map()
  @Input() groupname: string =""
  @Output() onMouseOver:EventEmitter<InfoBubbleDto> =new EventEmitter<InfoBubbleDto>();
  @Output() onMouseOut:EventEmitter<never> =new EventEmitter<never>();

  constructor(private el: ElementRef, private factoryResolver:ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  @HostListener("mouseenter") onMouseEnter() {
    let x = this.el.nativeElement.cx.baseVal.value
    let y = this.el.nativeElement.cy.baseVal.value
    this.onMouseOver.emit({x:x, y:y, info:this.info, groupname: this.groupname})
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.onMouseOut.emit()
  }


}
