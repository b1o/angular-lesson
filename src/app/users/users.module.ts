import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { ReverseStringPipe } from '../components/pipes/reverse-string.pipe';
import { PostComponent } from './components/post/post.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import {FormsModule} from "@angular/forms";

const routes:  Route[] = [
  {path: '',  component: UsersPageComponent},
  {path: ':id', component: UserDetailsPageComponent},
  {path: ':id/posts/create', component: AddNewPostComponent}
]

@NgModule({
  declarations: [UsersPageComponent, UserDetailsPageComponent, ReverseStringPipe, PostComponent, AddNewPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class UsersModule { }
