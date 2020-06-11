import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-av-single-control',
  templateUrl: './single-control.component.html',
  styleUrls: ['./single-control.component.scss']
})
export class SingleControlComponent {
  readonly usernameControl = new FormControl(null, 
    { asyncValidators: userDoesNotExist, updateOn: 'blur' });
  
  constructor(cd: ChangeDetectorRef) {
    // Uncoment to fix the problem with UI update
    // this.usernameControl.statusChanges.subscribe(() => cd.markForCheck());
  }
}

function userDoesNotExist(control: FormControl): Observable<ValidationErrors | null> {
  console.log('Starting async validation...')
  const result$ = control.value && control.value !== 'test'
    // 'delay' is used to simulate server call
    ? of({'user-does-not-exist': true}).pipe(delay(1000))
    : of(null).pipe(delay(1000));

  return result$.pipe(tap(result => console.log(result)));
}