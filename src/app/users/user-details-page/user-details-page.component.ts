import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../networking/network.service';
import {User} from '../models/user';
import {Observable, Subscription} from 'rxjs';
import {Post} from '../models/post';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {
  public userId;
  public user: User;
  public posts: Post[] = [];
  public subscriptions: Subscription[] = [];

  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      });
    this.data.getUsers().subscribe(data => {
      this.user = data.find(u => u.id == this.userId);
    });

    this.subscriptions.push(
      this.data.getPosts().subscribe(postsTable => {
        this.posts = postsTable[this.userId];
      }));

    // this.data.getPostsByUsedId(this.userId);
    //
    // this.subscriptions.push(
    //   this.data.getPopularPosts().subscribe());
  }

  onDeletePost(post: Post){
    // this.posts = this.posts.filter(p => p.id != post.id);
    this.data.removePost(post.id, post.userId);
  }

  navigateToCreate(){
    this.router.navigateByUrl('users/' + this.userId + '/create/');
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }
}
