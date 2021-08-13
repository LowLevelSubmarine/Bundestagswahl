import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCircle]'
})
export class CircleDirective {

  constructor(private el: ElementRef) { }

  @HostListener("mouseenter") onMouseEnter() {
    console.log("hi")
  }

}
