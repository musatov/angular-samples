import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const USERS = {
  john: 'john@doe.com',
  alex: 'alex@smith.com'
};

@Injectable({ providedIn: 'root'})
export class LookupService {
  credentialsAreAlreadyUsed(authType: string, authCredentials: string): Observable<boolean> {
    switch (authType) {
      case 'username':
        const usernameIsUsed = Object.keys(USERS).includes(authCredentials);
        return of(usernameIsUsed).pipe(delay(1000));
      case 'email':
        const emailIsUsed = Object.values(USERS).includes(authCredentials);
        return of(emailIsUsed).pipe(delay(1000));
      default:
        return of(false).pipe(delay(1000));
    }
  }
}