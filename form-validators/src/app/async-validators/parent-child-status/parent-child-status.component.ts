import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

type ValidatorStatus = 'NONE' | 'STARTED' | 'COMPLETED';

@Component({
  selector: 'app-parent-child-status',
  templateUrl: './parent-child-status.component.html',
  styleUrls: ['./parent-child-status.component.scss']
})
export class ParentChildStatusComponent {
  public readonly form: FormGroup;
  public readonly usernameValidatorStatus$ = new BehaviorSubject<ValidatorStatus>('NONE');
  public readonly passwordValidatorStatus$ = new BehaviorSubject<ValidatorStatus>('NONE');
  constructor(
    cd: ChangeDetectorRef,
  ) { 
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required], [this.userDoesNotExist.bind(this)]),
      'password': new FormControl(null, [])
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
