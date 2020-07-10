import { Component, OnInit } from '@angular/core';
import {DataService} from '../../users/services/data.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onLogin(){
    this.authService.login(this.email, this.password);
  }
}
