import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinearGraphComponent} from "./components/linear-graph/linear-graph.component";
import { CircleDirective } from './directives/circle.directive';
import { LineDirective } from './directives/line.directive';



@NgModule({
  declarations: [LinearGraphComponent, CircleDirective, LineDirective],
  imports: [
    CommonModule
  ],
  exports: [LinearGraphComponent]
})
export class LinearGraphModule { }
