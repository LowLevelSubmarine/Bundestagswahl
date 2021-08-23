import {Component, HostListener, Input, OnInit} from '@angular/core';
import {InfoBubbleDto} from "../../dto/InfoBubbleDto";
import {GradientComponent} from "../gradient/gradient.component";
// @ts-ignore
import * as viewDimensions from "../../../../../wasm";

@Component({
  selector: 'g[lchart-info-bubble]',
  templateUrl: './info-bubble.component.html',
  styleUrls: ['./info-bubble.component.scss']
})
export class InfoBubbleComponent implements OnInit {


  @Input() viewDimensions!: viewDimensions.ViewDimensions;
  @Input() gradient!: GradientComponent
  bubbleX =0
  bubbleY =0
  bubbleOpen = false
  bubbleWidth = 150
  bubbleHeight = 50
  private noseWidth = 16
  private bubblePaddingSide = 5
  private bubblePaddingTopBottom = 19
  private bubbleInfo: Map<string, string> = new Map<string, string>();
  private mouseOverBubble = false
  private requestBubbleClose = false

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.mouseOverBubble = true
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.requestBubbleClose) {
      this.bubbleOpen = false
      this.gradient.hideGradient()
      this.requestBubbleClose = false
    }
    this.mouseOverBubble = false
  }

  // BUBBLE

  openBubble($event: InfoBubbleDto ) {
    this.gradient.hideGradient()
    this.bubbleX = $event.x - (this.bubbleWidth/2)
    this.bubbleY =  $event.y - this.bubbleHeight - (this.noseWidth/2)
    this.bubbleOpen = true
    this.bubbleInfo = $event.info
    this.gradient.showGradient($event.groupname)
  }

  closeBubble() {
    if (!this.mouseOverBubble) {
      this.bubbleOpen = false
      this.gradient.hideGradient()
    } else {
      this.requestBubbleClose = true
    }
  }

  isBubbleOpen(): boolean {
    return this.bubbleOpen
  }

  getBubbleTrianglepoints(): string {
    let result = ""
    result += `${this.bubbleX+(this.bubbleWidth/2) - (this.noseWidth/2)},${this.bubbleY+ this.bubbleHeight-0.2} `
    result += `${this.bubbleX+(this.bubbleWidth/2) + (this.noseWidth/2)},${this.bubbleY+ this.bubbleHeight-0.2} `
    result += `${this.bubbleX+(this.bubbleWidth/2)},${this.bubbleY+this.bubbleHeight+(this.noseWidth/2)} `
    return  result
  }

  getEntries(): [string, string][] {
    return Array.from(this.bubbleInfo.entries());
  }

  getBubbleCaptionTextX() {
    return this.bubbleX +(this.bubbleWidth/2)
  }

  getBubbleCaptionTextY() {
    return this.bubbleY +this.bubblePaddingTopBottom
  }


}
