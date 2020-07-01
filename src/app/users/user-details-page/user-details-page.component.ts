import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NetworkService} from '../../networking/network.service';
import {User} from '../models/user';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;
  public user: User;

  constructor(private activatedRoute: ActivatedRoute, private network: NetworkService) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      });
    this.network.getUserById(this.userId)
      .subscribe(data => {
        this.user = data;
      });
  }

  ngOnInit(): void {
  }

}
