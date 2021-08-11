import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-point-graph',
  templateUrl: './point-graph.component.html',
  styleUrls: ['./point-graph.component.scss']
})

export class PointGraphComponent {

  @Input() data: any | null = null;

  colorScheme = {
    domain: ['#1A1A1A', '#2E942A', '#9E2A2A', '#E3D025', '#4396DF', '#B643DF', '#D27F37']
  };

}
