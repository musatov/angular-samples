import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-parent-child-status',
  templateUrl: './parent-child-status.component.html',
  styleUrls: ['./parent-child-status.component.scss']
})
export class ParentChildStatusComponent {
  public readonly form: FormGroup;
  constructor(
    cd: ChangeDetectorRef,
  ) { 
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required], [userDoesNotExist]),
      'password': new FormControl(null, [Validators.required])
    }, { updateOn: 'blur', asyncValidators: passwordAlreadyUsed });

    // this.form.statusChanges.subscribe(() => cd.markForCheck());
  }
}



function userDoesNotExist(control: FormControl): Observable<ValidationErrors | null> {
  console.log('userDoesNotExist');
  const result$ = control.value && control.value !== 'test'
    // 'delay' is used to simulate server call
    ? of({'user-does-not-exist': true}).pipe(delay(1000))
    : of(null).pipe(delay(1000));

  return result$.pipe(tap(() => console.log('userDoesNotExist: completed')));;
}

function passwordAlreadyUsed(control: FormGroup): Observable<ValidationErrors | null> {
  console.log('passwordAlreadyUsed');
  const password = control.get('password');
  const username = control.get('username');

  const result$ = password.value === 'password' && username.value == 'test'
    // 'delay' is used to simulate server call
    ? of({'password-previously-used': true}).pipe(delay(5000))
    : of(null).pipe(delay(5000));

  return result$.pipe(tap(() => console.log('passwordAlreadyUsed: completed')));
}