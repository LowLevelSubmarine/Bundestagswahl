import {GroupValueDto} from "../../dto/group-dto";

export class ViewDimensions {
  xMultiplier = 500
  yMultiplier = 7
  xOffset = 10
  yOffset = 10

  svgWidth = 1000
  svgHeight = 500
  yMarkerUnit = "%"


  getX(point: number) {
    return (point * this.xMultiplier)+this.xOffset
  }

  getY(point: number) {
    return (this.svgHeight-(point * this.yMultiplier)) -(this.yOffset* this.yMultiplier)
  }

}
