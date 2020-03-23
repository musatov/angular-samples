import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyChildOneComponent } from './lazy-child-one.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ComponentComponent } from './component/component.component';
import { ChildComponentComponent } from './parent-component/child-component/child-component.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LazyChildOneComponent,
  }
]

@NgModule({
  declarations: [LazyChildOneComponent, ParentComponentComponent, ComponentComponent, ChildComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyChildOneModule { }
