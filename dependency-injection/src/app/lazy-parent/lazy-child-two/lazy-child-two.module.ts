import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyChildTwoComponent } from './lazy-child-two.component';
import { ComponentComponent } from './component/component.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LazyChildTwoComponent,
  }
]

@NgModule({
  declarations: [LazyChildTwoComponent, ComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyChildTwoModule { }
