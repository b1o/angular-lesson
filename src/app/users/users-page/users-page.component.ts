import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../../networking/network.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  public users: User[] = [];

  constructor(private data: DataService, private router: Router) {
    this.data.users$.subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  ngOnInit(): void {
  }

  navigateToDetails(userId){
    this.router.navigateByUrl('users/' + userId);
  }
}
