import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-with-dependent-controls',
  templateUrl: './form-with-dependent-controls.component.html',
  styleUrls: ['./form-with-dependent-controls.component.scss'],
})
export class FormWithDependentControlsComponent {
  public readonly form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmation': new FormControl(null, [Validators.required])
    }, [passwordConfirmationMissmatch], [passwordMustBeDifferentFromThePrevious]);
  }
}

function passwordConfirmationMissmatch(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const confirmation = control.get('confirmation');
  if (!password || !confirmation || password.value === confirmation.value) {
    return null;
  }
  
  return { 'password-confirmation-mismatch': true };
}

function passwordMustBeDifferentFromThePrevious(control: FormGroup): Observable<ValidationErrors | null> {
  const email = control.get('email');
  const password = control.get('password');
  const confirmation = control.get('confirmation');
  if (!email || !password || !confirmation) {
    return null;
  }
  
  const result$ = password.value === 'password' 
    // 'delay' is used to simulate server call
    ? of({'password-previously-used': true}).pipe(delay(2000))
    : of(null).pipe(delay(2000));

  return result$.pipe(
    tap(result => {
        if (result) {
          password.setErrors({...password.errors, ...result});
          confirmation.setErrors({...password.errors, ...result});
        } else if (password.errors) {
          const passwordErrors = { ...password.errors };
          delete passwordErrors['password-previously-used'];
          const confirmationErrors = { ...confirmation.errors };
          delete confirmationErrors['password-previously-used'];
        }
    })
  );  
}
