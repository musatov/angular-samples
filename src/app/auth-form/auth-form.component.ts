import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  readonly authForm: FormGroup;
  constructor(
    fb: FormBuilder
  ) { 
    this.authForm = fb.group({
      username:   [ null, Validators.required ],
      authMethod: [ null, Validators.required ],
      authValue:  [ null, Validators.required ]
    })
  }
}
