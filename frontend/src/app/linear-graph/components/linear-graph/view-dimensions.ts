
export class ViewDimensions {

  circleRadius = 4

  xOffset = 40
  yPaddingTop = this.circleRadius*2//this.circleRadius+ 60
  yPaddingBottom = this.circleRadius+50 //this.circleRadius+10

  svgWidth = 1000
  svgHeight = 500
  yMarkerUnit = "%"

  xMultiplier = 0
  yMultiplier = 0

  recalculateViewDimensions() {
    this.xMultiplier = (this.svgWidth-this.xOffset-this.circleRadius*2)
    this.yMultiplier = (this.svgHeight -this.yPaddingTop-this.yPaddingBottom)

    if (this.xMultiplier<0) this.xMultiplier = 1
    if (this.yMultiplier<0) this.yMultiplier = 1
  }




  getX(point: number) {
    return point * (this.xMultiplier)+(this.xOffset)
  }

  getY(point: number) {
    return (this.svgHeight-(point * this.yMultiplier) -this.yPaddingBottom)
  }

}
