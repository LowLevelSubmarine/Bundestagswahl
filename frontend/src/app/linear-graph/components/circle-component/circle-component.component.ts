import {Component, HostListener, Input, OnInit} from '@angular/core';
import {InfoBubbleComponent} from "../info-bubble/info-bubble.component";
import {GradientComponent} from "../gradient/gradient.component";

@Component({
  selector: 'g[lchart-circle-component]',
  templateUrl: './circle-component.component.html',
  styleUrls: ['./circle-component.component.scss']
})
export class CircleComponentComponent implements OnInit {

  @Input() cx = 0
  @Input() cy = 0
  radius = 4
  @Input() strokeColor = "#000000"
  @Input() info!: Map<string,string>
  @Input() groupname! :string
  @Input() infoBubble!: InfoBubbleComponent
  @Input() gradientComponent!: GradientComponent
  strokeWidth = 2
  strokeWidthLarge = 8


  @HostListener("mouseenter") onMouseEnter() {
    this.infoBubble.openBubble({x:this.cx,y:this.cy,info:this.info, groupname:this.groupname})
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.infoBubble.closeBubble()
  }

  @HostListener('focusout', ['$event'])
  focusout(event:any) {
    this.infoBubble.closeBubble()
  }

  @HostListener("focusin") onClick() {
    if (this.infoBubble.isBubbleOpen()) {
      this.infoBubble.closeBubble()
    } else {
      this.infoBubble.openBubble({x:this.cx,y:this.cy,info:this.info, groupname:this.groupname})
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}
