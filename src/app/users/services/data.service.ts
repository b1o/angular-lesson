import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {NetworkService} from '../../networking/network.service';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userIdPostsMappingTable: { [key: number]: Post[] } = {};

  private users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private posts$: BehaviorSubject<{[key: number]: Post[]}> = new BehaviorSubject([]);

  private newPosts;

  constructor(private network: NetworkService) {
    network.getUsers().subscribe(data => {
      this.users$.next(data);
    });
    network.getPosts().subscribe(posts => {
      for (const post of posts){
        const postWithLikes = {...post, likes: Math.floor(Math.random() * 101)};
        if (!this.userIdPostsMappingTable[post.userId]){
          this.userIdPostsMappingTable[post.userId] = [];
        }
        this.userIdPostsMappingTable[post.userId].push(postWithLikes);
      }
      this.posts$.next(this.userIdPostsMappingTable);
    });
  }

  getUsers() {
    return this.users$.asObservable();
  }
  getPosts() {
    return this.posts$.asObservable();
  }
  getPopularPosts(){
    const reducer = (acc, value) => [...acc, ...value];
    return this.posts$.pipe(
      map(mappingTable => Object.keys(mappingTable)
        .map(key => mappingTable[key])
        .reduce(reducer, [])
        .filter(post => post.likes > 50)
        .sort((post1, post2) => post2.likes - post1.likes))
    );
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
        const postsWithLikes = posts.map(post => ({...post, likes: Math.floor(Math.random() * 101)}));
        this.userIdPostsMappingTable[userId] = postsWithLikes;
        this.posts$.next(this.userIdPostsMappingTable);
      });
  }

  public getAllUsers(){
      return this.users$;
  }

  public removePost(postId, userId){
    const subscription = this.getPosts().subscribe(data => {
      data[userId] = data[userId].filter(post => post.id != postId);
      this.newPosts = data;
    });
    subscription.unsubscribe();
    this.posts$.next(this.newPosts);
  }
}
