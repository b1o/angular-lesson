import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';


const route: Route[] = [
  {path: '', component: ProfilePageComponent}
]


@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MaterialModule
  ]
})
export class ProfileModule { }
