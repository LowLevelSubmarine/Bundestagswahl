import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

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

  onChange(party: any) {
    console.log(party)
  }

}
