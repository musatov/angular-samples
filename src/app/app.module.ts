import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form/auth-form.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AuthFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
