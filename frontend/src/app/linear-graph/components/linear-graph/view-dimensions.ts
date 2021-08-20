
export class ViewDimensions {

  circleRadius = 4

  xOffset = 150
  yPaddingTop = this.circleRadius+ 60
  yPaddingBottom = this.circleRadius+10

  svgWidth = 1000
  svgHeight = 500
  yMarkerUnit = "%"

  xMultiplier = 0
  yMultiplier = 0

  recalculateViewDimensions() {
    this.xMultiplier = Math.abs(this.svgWidth-this.xOffset-this.circleRadius*2)
    this.yMultiplier = Math.abs(this.svgHeight -this.yPaddingTop-this.yPaddingBottom)
  }




  getX(point: number) {
    return point * (this.xMultiplier)+(this.xOffset/2)
  }

  getY(point: number) {
    return (this.svgHeight-(point * this.yMultiplier) -this.yPaddingBottom)
  }

}
