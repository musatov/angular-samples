import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

type ValidatorStatus = 'NONE' | 'STARTED' | 'COMPLETED';

@Component({
  selector: 'app-parent-child-validation',
  templateUrl: './parent-child-validation.component.html',
  styleUrls: ['./parent-child-validation.component.scss']
})
export class ParentChildValidationComponent {
  public readonly form: FormGroup;
  public readonly usernameValidatorStatus$ = new BehaviorSubject<ValidatorStatus>('NONE');
  public readonly passwordValidatorStatus$ = new BehaviorSubject<ValidatorStatus>('NONE');
  constructor(
    cd: ChangeDetectorRef,
  ) { 
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required], [this.userDoesNotExist.bind(this)]),
      'password': new FormControl(null, [Validators.required])
    }, { updateOn: 'blur', asyncValidators: this.passwordAlreadyUsed.bind(this) });
  }

  private userDoesNotExist(control: FormControl): Observable<ValidationErrors | null> {
    this.usernameValidatorStatus$.next('STARTED');
    const result$ = control.value && control.value !== 'test'
      // 'delay' is used to simulate server call
      ? of({'user-does-not-exist': true}).pipe(delay(1000))
      : of(null).pipe(delay(1000));
  
    return result$.pipe(tap(() => this.usernameValidatorStatus$.next('COMPLETED')));
  }

  private passwordAlreadyUsed(control: FormGroup): Observable<ValidationErrors | null> {
    this.passwordValidatorStatus$.next('STARTED');
    const password = control.get('password');
    const username = control.get('username');
  
    const result$ = password.value === 'password' && username.value == 'test'
      // 'delay' is used to simulate server call
      ? of({'password-previously-used': true}).pipe(delay(5000))
      : of(null).pipe(delay(5000));
  
      return result$.pipe(tap(() => this.passwordValidatorStatus$.next('COMPLETED')));
  }
}
