import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PointGraphComponent } from './components/point-graph/point-graph.component';
import {ChartCommonModule, LineChartModule, NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {LinearGraphModule} from "./linear-graph/linear-graph.module";
import {GraphPartySelectorComponent} from "./components/graph-party-selector/graph-party-selector.component";
import { SectionComponent } from './components/section/section.component';
import { ParliamentCompositionComponent } from './components/parliament-composition/parliament-composition.component';

@NgModule({
  declarations: [
    AppComponent,
    PointGraphComponent,
    GraphPartySelectorComponent,
    SectionComponent,
    SectionComponent,
    ParliamentCompositionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LineChartModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartCommonModule,
    LinearGraphModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
