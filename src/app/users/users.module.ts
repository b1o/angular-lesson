import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { ReverseStringPipe } from '../components/pipes/reverse-string.pipe';
import { PostComponent } from './components/post/post.component';
import { CreatPostComponent } from './components/creat-post/creat-post.component';

const routes:  Route[] = [
  {path: '',  component: UsersPageComponent},
  {path: ":id", component: UserDetailsPageComponent},
  {path:":id/add",component:CreatPostComponent}
]

@NgModule({
  declarations: [UsersPageComponent, UserDetailsPageComponent, ReverseStringPipe, PostComponent,CreatPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class UsersModule { }
