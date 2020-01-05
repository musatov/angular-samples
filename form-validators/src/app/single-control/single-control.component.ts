import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-control',
  templateUrl: './single-control.component.html',
  styleUrls: ['./single-control.component.scss']
})
export class SingleControlComponent {
  readonly emailControl: FormControl;
  constructor() {
    this.emailControl = new FormControl(null, [Validators.required, Validators.email], [])
  }
}
// ToDo: Async Validator email used

