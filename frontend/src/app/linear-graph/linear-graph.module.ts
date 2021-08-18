import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinearGraphComponent} from "./components/linear-graph/linear-graph.component";
import { CircleComponentComponent } from './components/circle-component/circle-component.component';
import { InfoBubbleComponent } from './components/info-bubble/info-bubble.component';
import { GradientComponent } from './components/gradient/gradient.component';
import { LineComponent } from './components/line/line.component';



@NgModule({
  declarations: [LinearGraphComponent, CircleComponentComponent, InfoBubbleComponent, GradientComponent, LineComponent],
  imports: [
    CommonModule
  ],
  exports: [LinearGraphComponent]
})
export class LinearGraphModule { }
