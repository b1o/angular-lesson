import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title;

  public isLoggedIn = false;

  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user){
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
