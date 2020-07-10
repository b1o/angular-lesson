import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import {AuthGuard} from './auth/auth.guard';
import {PageNotFoundComponent} from './auth/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'profile', loadChildren: () => import('./profile/profile.module')
      .then(m  => m.ProfileModule)},
  {path: 'login', loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: 'users', loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule), canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
