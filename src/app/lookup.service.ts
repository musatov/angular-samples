import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const USERS = {
  john: 'john@doe.com',
  alex: 'alex@smith.com'
};

@Injectable({ providedIn: 'root'})
export class LookupService {
  usernameUsed(username: string): Observable<boolean> {
    const usernameIsUsed = Object.keys(USERS).includes(username);
    return of(usernameIsUsed).pipe(delay(1000));
  }

  emailUsed(email: string): Observable<boolean> {
    const emailIsUsed = Object.values(USERS).includes(email);
    return of(emailIsUsed).pipe(delay(1000));
  }
}