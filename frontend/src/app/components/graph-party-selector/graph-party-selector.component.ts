import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {Party} from "../../dto/party.dto";
import {PartySelectorParty} from "./party-selector-party";

@Component({
  selector: 'app-graph-party-selector',
  templateUrl: './graph-party-selector.component.html',
  styleUrls: ['./graph-party-selector.component.scss']
})
export class GraphPartySelectorComponent implements OnInit{

  @Input() public parties: PartySelectorParty[] = [];
  public form!: FormGroup
  @Output() onChange:EventEmitter<Party| undefined> = new EventEmitter()


  constructor(private formBuilder: FormBuilder) {}

  onChangeFunction(party: PartySelectorParty) {

    let isEnabled = this.form.value[party.shortcut]
    this.form.reset()
    if (isEnabled) {
      this.form.controls[party.shortcut].setValue(true)
      this.onChange.emit(party)
    } else {
      this.onChange.emit(undefined)
    }
  }


  ngOnInit(): void {
    let partyData:any = {};

    for (let party of this.parties) {
      partyData[party.shortcut] = [false];
    }
    this.form = this.formBuilder.group(partyData);
  }

}
