import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from './users/models/user';
import {DataService} from './users/services/data.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: BehaviorSubject<User> = new BehaviorSubject(null);
  private testPassword = '123';
  private users: User[] = [];
  constructor(private data: DataService, private router: Router) {
    data.getUsers().subscribe(users => this.users = users);
  }

  public get currentUser(){
    return this.user$.asObservable();
  }
  public login(email, password){
    const userExists = this.users.find(u => u.email == email);
    if (userExists && this.testPassword == password){
      console.log('Auth success!');
      this.user$.next(userExists);
      this.router.navigateByUrl('/users');
    }
    else {
      alert('Wrong email or password!');
    }
  }

  public register(){}

  public logout(){
    this.user$.next(null);
    this.router.navigateByUrl('/login');
  }
}
