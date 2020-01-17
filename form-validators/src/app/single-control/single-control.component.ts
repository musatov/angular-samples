import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-single-control',
  templateUrl: './single-control.component.html',
  styleUrls: ['./single-control.component.scss']
})
export class SingleControlComponent {
  readonly emailControl = new FormControl(null, 
    // Sync validators
    [Validators.required, Validators.email],
    // Async validators
    [emailMustNotBeUsed, emailIsForbidden]);
}

function emailMustNotBeUsed(control: AbstractControl): Observable<ValidationErrors | null> {
  console.log('First async validator stars executing');
  const resutl$ = control.value === 'used@email.com' 
      ? of({'email-is-used': 'Email was used'}).pipe(delay(2000))
      : of(null).pipe(delay(2000));
  return resutl$.pipe(finalize(() => console.log('First async validator completed')));    
}

function emailIsForbidden(control: AbstractControl): Observable<ValidationErrors | null> {
  console.log('Second async validator stars executing');
  const resutl$ = control.value === 'forbidden@email.com' 
      ? of({'email-is-forbidden': 'Email was forbidden'}).pipe(delay(1500))
      : of(null).pipe(delay(1500));

  return resutl$.pipe(finalize(() => console.log('Second async validator completed')));    
}
