import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyParentComponent } from './lazy-parent.component';

const routes: Routes = [
  {
    path: '',
    component: LazyParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'one',
        pathMatch: 'full'
      },
      {
        path: 'one',
        loadChildren: () => import('./lazy-child-one/lazy-child-one.module').then(m => m.LazyChildOneModule)
      },
      {
        path: 'two',
        loadChildren: () => import('./lazy-child-two/lazy-child-two.module').then(m => m.LazyChildTwoModule)
      }
    ]
  }
];


@NgModule({
  declarations: [LazyParentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyParentModule { }
