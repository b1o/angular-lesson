import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

const routes: Route[] = [
  {path: '', component: RegisterPageComponent}
]


@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
