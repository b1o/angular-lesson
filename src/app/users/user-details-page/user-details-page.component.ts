import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {delay} from 'rxjs/operators'
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from '../models/user';
import { NetworkService } from 'src/app/networking/network.service';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit, OnChanges, OnDestroy {
  public userId;

  public user: User;
  public posts: Post[] = [];

  public subscriptions: Subscription[] = [];

  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
        console.log(params.get('id'))
      })

    this.data.getUsers().subscribe(data => {
      this.user = data.find(u => u.id == this.userId);
    })

    this.subscriptions.push(
      this.data.getPosts().subscribe(postsTable => {
        console.log('memory leak')
        this.posts = postsTable[this.userId];
      })
    )

    this.data.getPostsByUserId(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  forceDetection(){
    this.cd.detectChanges()
  }

  onDeletePost(post: Post) {
    console.log(post)
    this.posts = this.posts.filter(p => p.id != post.id)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    for  (const sub of this.subscriptions)  {
      sub.unsubscribe();
    }
  }

}
