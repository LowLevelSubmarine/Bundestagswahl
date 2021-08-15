import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-parliament-composition',
  templateUrl: './parliament-composition.component.html',
  styleUrls: ['./parliament-composition.component.scss']
})
export class ParliamentCompositionComponent {

  @Input() public seatAreaWidth = 25
  @Input() public elements: ParliamentCompositionElement[] = []
  @Input() public showLabels = true
  Math = Math;

  indexToCoordinates(index: number) {
    let start = 0;
    for (let i = 0; i < index; i++) {
      start += this.elements[i].size
    }
    const end = start + this.elements[index].size;
    return this.angleToCoordinate(start, 200) + " 50,50 " + this.angleToCoordinate(end, 200)
  }

  indexToCoordinate(index: number, distance: number) {
    let pos = 0;
    for (let i = 0; i < index; i++) {
      pos += this.elements[i].size
    }
    pos += this.elements[index].size / 2;
    return this.angleToCoordinate(pos, distance)
  }

  angleToCoordinate(angle: number, distance: number): number[] {
    angle = this.map(angle, 0, 1, 0.875, 0.125)
    return [(Math.sin(angle * 0.0174532925 * 360) * distance + 50), (Math.cos(angle * 0.0174532925 * 360) * distance + 50)]
  }

  map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}

export interface ParliamentCompositionElement {
  color: string
  size: number
}
