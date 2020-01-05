import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent {
  public readonly form: FormGroup;
  constructor() { 
    this.form = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'confirmation': new FormControl(null, [Validators.required])
    }, [ passwordConfirmationMissmatch ]);
  }
}

function passwordConfirmationMissmatch(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const confirmation = control.get('confirmation');
  if (!password || !confirmation || password.value === confirmation.value) {
    return null;
  }
  
  return { 'password-confimration-mismatch': true };
}
