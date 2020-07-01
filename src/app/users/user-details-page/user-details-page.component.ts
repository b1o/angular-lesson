import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {delay} from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { NetworkService } from 'src/app/networking/network.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;

  public user$: Observable<User>;
  public posts$: Observable<Post[]>;

  public user: User;
  public name = "gosho  and pesho";


  constructor(private http: NetworkService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      })

    this.user$ = this.http.getUserById(this.userId)

    this.posts$ = this.http.getPostsByUserId(this.userId)
  }
  ngOnInit(): void {
  }

}
