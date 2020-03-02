import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-async-validators',
  templateUrl: './async-validators.component.html',
  styleUrls: ['./async-validators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncValidatorsComponent {}
