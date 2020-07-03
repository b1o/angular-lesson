import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { ReverseStringPipe } from '../components/pipes/reverse-string.pipe';
import { PostComponent } from './components/post/post.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';

const routes:  Route[] = [
  {path: '',  component: UsersPageComponent},
  {path: ':id', component: UserDetailsPageComponent},
  {path: ':id/create', component: CreatePostPageComponent},
]

@NgModule({
  declarations: [UsersPageComponent, UserDetailsPageComponent, ReverseStringPipe, PostComponent, CreatePostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  providers: [DataService]
})
export class UsersModule { }
