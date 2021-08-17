import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinearGraphComponent} from "./components/linear-graph/linear-graph.component";
import { LineDirective } from './directives/line.directive';
import { CircleComponentComponent } from './components/circle-component/circle-component.component';
import { InfoBubbleComponent } from './components/info-bubble/info-bubble.component';
import { GradientComponent } from './components/gradient/gradient.component';



@NgModule({
  declarations: [LinearGraphComponent, LineDirective, CircleComponentComponent, InfoBubbleComponent, GradientComponent],
  imports: [
    CommonModule
  ],
  exports: [LinearGraphComponent]
})
export class LinearGraphModule { }
