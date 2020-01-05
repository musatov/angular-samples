import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormWithDependentControlsComponent } from './form-with-dependent-controls/form-with-dependent-controls.component';
import { HomeComponent } from './home/home.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { SingleControlComponent } from './single-control/single-control.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'single',
    component: SingleControlComponent
  },
  {
    path: 'simple',
    component: SimpleFormComponent
  },
  {
    path: 'dependent',
    component: FormWithDependentControlsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FormWithDependentControlsComponent,
    HomeComponent,
    SimpleFormComponent,
    SingleControlComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
