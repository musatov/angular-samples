import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthCredentialsValidatorFactory } from './auth-credentials.validator.factory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  providers: [AuthCredentialsValidatorFactory]
})
export class AuthFormComponent implements OnDestroy {
  readonly authForm: FormGroup;

  private readonly authMethodStatusChangeSubscription: Subscription;

  constructor(
    fb: FormBuilder,
    validatorFactory: AuthCredentialsValidatorFactory
  ) {
    const authMethod = fb.control(null, Validators.required);
    const authCredentials = fb.control(null, Validators.required);
    this.authMethodStatusChangeSubscription = authMethod.statusChanges
      .pipe(filter(status => 'VALID' === status))
      .subscribe(() => {
        authCredentials.setAsyncValidators(validatorFactory.validator(authMethod.value));
        authCredentials.updateValueAndValidity();
      });
    
    this.authForm = fb.group({
      authMethod,
      authCredentials
    });
  }

  ngOnDestroy(): void {
    this.authMethodStatusChangeSubscription.unsubscribe();
  }
}
