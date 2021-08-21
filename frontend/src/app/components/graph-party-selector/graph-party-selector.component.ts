import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {Party} from "../../dto/party.dto";

@Component({
  selector: 'app-graph-party-selector',
  templateUrl: './graph-party-selector.component.html',
  styleUrls: ['./graph-party-selector.component.scss']
})
export class GraphPartySelectorComponent {

  @Input() public parties: any[] = [];
  public form: FormGroup = new FormGroup({
    party: new FormControl()
  })
  @Output() onChange:EventEmitter<Party> = new EventEmitter()

  onChangeFunction(party: any) {
    this.onChange.emit(party)
  }

}
