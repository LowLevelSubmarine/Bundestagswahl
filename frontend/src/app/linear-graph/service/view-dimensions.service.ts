import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import init, {ViewDimensions} from "char-wasm";

@Injectable({
  providedIn: 'root'
})
export class ViewDimensionsService {


  ready: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() {
  }

  async viewDimensions(){
    await init("assets/char_wasm_bg.wasm").then(r => this.ready.next(true))
    return ViewDimensions.new();
  }
}
