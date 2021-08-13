import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PointGraphComponent } from './components/point-graph/point-graph.component';
import {ChartCommonModule, LineChartModule, NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    PointGraphComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LineChartModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartCommonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
