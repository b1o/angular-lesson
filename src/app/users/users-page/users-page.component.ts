import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/networking/network.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  public users: User[] = [];

  constructor(private network: NetworkService, private router: Router) {
      this.network.getUsers()
        .subscribe(data => {
          this.users = data;

          console.log(this.users);
        })
   }

  ngOnInit(): void {
  }

  navigateToDetails(userId) {
    console.log(userId)
    this.router.navigateByUrl('users/' +  userId)
  }
}
