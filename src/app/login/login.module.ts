import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [{ path: '', component: LoginPageComponent }];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
  ],
})
export class LoginModule {}
