import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import {Route, RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';

const routes: Route [] = [
  {path: '', component: UsersPageComponent},
  {path: ':id', component: UserDetailsPageComponent}
];

@NgModule({
  declarations: [UsersPageComponent, UserDetailsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class UsersModule { }
