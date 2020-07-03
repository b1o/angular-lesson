import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {delay} from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { NetworkService } from 'src/app/networking/network.service';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;

  public user: User;
  public posts: Post[] = [];


  constructor(private data: DataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      })

    this.data.users$.subscribe(data => {
      this.user = data.find(u => u.id == this.userId);
    })

    this.data.posts$.subscribe(postsTable => this.posts = postsTable[this.userId])

    this.data.getPostsByUserId(this.userId)
  }
  ngOnInit(): void {
  }

}
