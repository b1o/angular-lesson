import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {NetworkService} from '../../networking/network.service';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userIdPostsMappingTable: { [key: number]: Post[] } = {};

  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public posts$: BehaviorSubject<{[key: number]: Post[]}> = new BehaviorSubject([]);

  constructor(private network: NetworkService) {
    network.getUsers().subscribe(data => {
      this.users$.next(data);
    });
  }
  public createPostForUser(userId, post: Post){
    this.network.createPost(post.title, post.body, userId)
      .subscribe(newPost => {
        if (!this.userIdPostsMappingTable[userId]){
          this.userIdPostsMappingTable[userId] = [];
        }
        this.userIdPostsMappingTable[userId].unshift(newPost);
        this.posts$.next(this.userIdPostsMappingTable);
      });
  }
  public getPostsByUsedId(userId){
    if (this.userIdPostsMappingTable[userId]) {
      return;
    }
    this.network.getPostsByUserId(userId)
      .subscribe(posts => {
        console.log('getting posts for user with id: ' + userId);
        this.userIdPostsMappingTable[userId] = posts;
        this.posts$.next(this.userIdPostsMappingTable);
      });
  }

  public getAllUsers(){
      return this.users$;
  }
}
