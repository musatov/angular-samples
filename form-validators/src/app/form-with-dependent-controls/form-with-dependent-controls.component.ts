import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-with-dependent-controls',
  templateUrl: './form-with-dependent-controls.component.html',
  styleUrls: ['./form-with-dependent-controls.component.scss']
})
export class FormWithDependentControlsComponent {
  public readonly form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmation': new FormControl(null, [Validators.required])
    }, [passwordConfirmationMissmatch], [passwordMustBeDifferentFromPreviousHiglight]);
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

function passwordMustBeDifferentFromPrevious(control: FormGroup): Observable<ValidationErrors | null> {
  const email = control.get('email');
  const password = control.get('password');
  if (!email || !password) {
    return null;
  }
  
  return password.value === 'password' 
    ? of({'password-previously-used': true}).pipe(delay(5000))
    : of(null).pipe(delay(5000));
}


// Sometime it is important to higlight fields where 
// changes must be applied to fix validation errors
function passwordMustBeDifferentFromPreviousHiglight(control: FormGroup): Observable<ValidationErrors | null> {
  const email = control.get('email');
  const password = control.get('password');
  const confirmation = control.get('confirmation');
  if (!email || !password || !confirmation) {
    return null;
  }
  
  const result$ = password.value === 'password' 
    ? of({'password-previously-used': true}).pipe(delay(5000))
    : of(null).pipe(delay(5000));

  return result$.pipe(
    tap(result => {
      if (result) {
        password.setErrors({...password.errors, ...result});
        confirmation.setErrors({...password.errors, ...result});
      } else {
        if (password.errors) {
          const passwordErrors = { ...password.errors };
          delete passwordErrors['password-previously-used'];
          const confirmationErrors = { ...confirmation.errors };
          delete confirmationErrors['password-previously-used'];
        }
      }
    })
  );  
}