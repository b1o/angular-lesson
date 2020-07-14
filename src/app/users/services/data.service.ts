import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { NetworkService } from 'src/app/networking/network.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';
import { map, reduce, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userIdPostsMappingTable: { [key: number]: Post[] } = {};

  form: {key: string, value: string} | null;
  private users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private posts$: BehaviorSubject<{
    [key: number]: Post[];
  }> = new BehaviorSubject([]);

  constructor(private network: NetworkService) {
    this.network.getUsers().subscribe((data) => this.users$.next(data));

    this.network.getPosts().subscribe(
      (posts) => {
        console.log(posts);
        for (const post of posts) {
          const postWithLikes = {
            ...post,
            likes: Math.floor(Math.random() * 101),
          };

          if (!this.userIdPostsMappingTable[postWithLikes.userId]) {
            this.userIdPostsMappingTable[postWithLikes.userId] = [];
          }

          this.userIdPostsMappingTable[postWithLikes.userId].push(
            postWithLikes
          );
        }

        this.posts$.next(this.userIdPostsMappingTable);
      },
      (err) => console.error(err),
      () => console.log('completed')
    );
  }

  getUsers() {
    return this.users$.asObservable();
  }

  getPosts() {
    return this.posts$.asObservable();
  }

  getPopularPosts() {
    const reducer = (acc, value) => [...acc, ...value];
    console.log(this.userIdPostsMappingTable);

    return this.posts$.pipe(
      map((mappingTable) =>
        Object.keys(mappingTable)
          .map((key) => mappingTable[key])
          .filter((post) => post.likes > 50)
          .sort((post1, post2) => post2.likes - post1.likes)
      )
    );
  }

  public createPostForUser(userId, post: Post) {
    this.network
      .createPost(post.title, post.body, userId)
      .subscribe((newPost) => {
        if (!this.userIdPostsMappingTable[userId]) {
          this.userIdPostsMappingTable[userId] = [];
        }

        this.userIdPostsMappingTable[userId].unshift(newPost);
        this.posts$.next(this.userIdPostsMappingTable);
      });
  }

  public getPostsByUserId(userId) {
    if (this.userIdPostsMappingTable[userId]) {
      return;
    }

    this.network.getPostsByUserId(userId).subscribe((posts) => {
      console.log('getting posts for user with id:' + userId);

      this.userIdPostsMappingTable[userId] = posts;

      this.posts$.next(this.userIdPostsMappingTable);
    });
  }

  public getAllUsers() {
    return this.users$;
  }
}
