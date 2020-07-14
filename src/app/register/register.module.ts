import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Route[] = [{ path: '', component: RegisterPageComponent }];

@NgModule({
  declarations: [RegisterPageComponent],
    imports: [CommonModule, MaterialModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class RegisterModule {}
