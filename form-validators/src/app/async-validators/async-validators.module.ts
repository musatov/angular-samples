import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncValidatorsComponent } from './async-validators.component';
import { SingleControlComponent } from './single-control/single-control.component';
import { ParentChildStatusComponent } from './parent-child-status/parent-child-status.component';
import { ParentChildValidationComponent } from './parent-child-validation/parent-child-validation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AsyncValidatorsComponent,
    SingleControlComponent,
    ParentChildStatusComponent,
    ParentChildValidationComponent
  ],
  exports: [ AsyncValidatorsComponent ]
})
export class AsyncValidatorsModule { }
