import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ChartElementDto} from "../../dto/chartElement.dto";
import {InfoBubbleDto} from "./InfoBubbleDto";
import {GroupDto, GroupValueDto} from "./group-dto";
import {OnLineDto} from "../../directives/line.directive";
@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss']
})
export class LinearGraphComponent implements OnInit {

  @Input()
  set data (elements: ChartElementDto[]) {
    this.buildGraph(elements)
  }
  uniPos: number[] = []
  groups: GroupDto[] = []
  xMultiplier = 500
  yMultiplier = 7
  xOffset = 10
  circleRadius = 4
  circleStroke = 2
  svgWidth = 1000
  svgHeight = 500
  yMarker: number[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
  yMarkerUnit = "%"
  yMaxValue = 100
  xMaxValue = 20

  /* string: Name of group| undefined: gidden*/
  gradient:string| undefined

  bubbleX =0
  bubbleY =0
  bubbleOpen = false
  bubbleWidth = 150
  bubbleHeight = 50
  noseWidth = 16
  bubblePaddingSide = 5
  bubblePaddingTopBottom = 19
  bubbleInfo: Map<string, string> = new Map<string, string>();



  constructor(private renderer: Renderer2, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  buildGraph(elements: ChartElementDto[]) {
    let minValue = null
    let maxValue = null
    let groups: GroupDto[] = []
    let names: string[] = []

    for (let element of elements) {
      if (!names.includes(element.name)) {
        names.push(element.name)
      }
      for (let serie of element.series) {
        if (maxValue == null ||serie.position> maxValue) {
          maxValue = serie.position
        }

        if (minValue == null ||serie.position< minValue) {
          minValue = serie.position
        }

      }
    }

    if (!minValue || !maxValue) {
      return
    }


    let maxYValue = 0
    this.uniPos = []

    for (let element of elements) {
      for (let serie of element.series) {
        let pos = (serie.position - minValue) / (maxValue - minValue)
        if (serie.value > maxYValue)  {
          maxYValue = serie.value
        }
        if (!this.uniPos.includes(pos)) {
          this.uniPos.push(pos)
        }

        if (groups.filter((it) => it.group == element.name).length == 0) {
          groups.push({group:element.name,color: element.color,values:[{position:pos, x: serie.name, y: serie.value, info: serie.info}]})
        } else {
            groups.filter((it) => it.group == element.name)[0].values.push({position:pos, x: serie.name, y: serie.value, info: serie.info})
        }
      }
    }

    this.yMaxValue = maxYValue
    console.log(this.yMaxValue)
    console.log((this.yMaxValue * this.yMultiplier))
    this.groups = groups
  }

  getX(point: GroupValueDto) {
    return (point.position * this.xMultiplier)+this.xOffset
  }

  getY(point:GroupValueDto) {
    return (this.svgHeight-(point.y * this.yMultiplier)) -(this.yMaxValue* this.yMultiplier)
  }

  getStrokeColor(group:any) {
    return `stroke:${group.color};`
  }

  getYScala(marker: number) {
    return (this.svgHeight-(marker * this.yMultiplier)) -(this.yMaxValue* this.yMultiplier)
  }

  // GRADIENT

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
        result += `${this.getX(point)},${this.getY(point)} `
      }
    result += `${this.getX(group.values[group.values.length-1])},${(this.svgHeight) -(this.yMaxValue* this.yMultiplier)} `
    result += `${this.getX(group.values[0])},${(this.svgHeight) -(this.yMaxValue* this.yMultiplier)} `
    return result
  }


  // BUBBLE

  openBubble($event: InfoBubbleDto ) {
    console.log($event)
    this.gradient = $event.groupname

    if (!this.bubbleOpen) {
      this.bubbleX = $event.x - (this.bubbleWidth/2)
      this.bubbleY =  $event.y - this.bubbleHeight - (this.noseWidth/2)
      this.bubbleOpen = true
      this.bubbleInfo = $event.info
    }
  }

  closeBubble() {
    this.gradient = undefined

    this.bubbleOpen = false
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
