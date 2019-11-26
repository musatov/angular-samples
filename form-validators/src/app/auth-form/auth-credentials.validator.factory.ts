import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LookupService } from '../lookup.service';

@Injectable()
export class AuthCredentialsValidatorFactory {
  constructor(
    private readonly lookupService: LookupService
  ) { }

  validator(authType: string): 
    (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.lookupService.credentialsAreAlreadyUsed(authType, control.value)
        .pipe(map(result => result ? null : {'credentials-not-found': true}));
    };
  }
}