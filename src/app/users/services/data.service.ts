import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {NetworkService} from 'src/app/networking/network.service';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Post} from '../models/post';
import {filter, map, reduce, startWith, tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import index from "@angular/cli/lib/cli";

@Injectable()
export class DataService {

  private userIdPostsMappingTable: { [key: number | string]: Post[] } = {}

  private users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private posts$: BehaviorSubject<{ [key: number]: Post[] }> = new BehaviorSubject([]);


  constructor(private network: NetworkService, private router: Router) {
    this.network.getUsers()
      .subscribe(data => this.users$.next(data));

    this.network.getPosts()
      .subscribe(posts => {
        console.log(posts)
        for (const post of posts) {
          const postWithLikes = {...post, likes: Math.floor(Math.random() * 101)};

          if (!this.userIdPostsMappingTable[postWithLikes.userId]) {
            this.userIdPostsMappingTable[postWithLikes.userId] = [];
          }

          this.userIdPostsMappingTable[postWithLikes.userId].push(postWithLikes)
        }

        this.posts$.next(this.userIdPostsMappingTable);
      })
  }

  getUsers() {
    return this.users$.asObservable();
  }

  getPosts() {
    return this.posts$.asObservable();
  }

  getPopularPosts() {
    const reducer = (acc, value) => [...acc, ...value];

    return this.posts$.pipe(
      map(mappingTable => Object.keys(mappingTable)
        .map(key => mappingTable[key])
        .reduce(reducer, [])
        .filter(post => post.likes > 50)
        .sort((post1, post2) => post2.likes - post1.likes)
      )
    )
  }

  public createPostForUser(userId, post: Post) {
    this.network.createPost(post.title, post.body, userId)
      .subscribe(newPost => {
        if (!this.userIdPostsMappingTable[userId]) {
          this.userIdPostsMappingTable[userId] = [];
        }

        this.userIdPostsMappingTable[userId].unshift(newPost)
        this.posts$.next(this.userIdPostsMappingTable);
      })
  }

  public getPostsByUserId(userId) {
    if (this.userIdPostsMappingTable[userId]) {
      return;
    }

    this.network.getPostsByUserId(userId)
      .subscribe(posts => {
        console.log('getting posts for user with id:' + userId)


        this.userIdPostsMappingTable[userId] = posts;

        this.posts$.next(this.userIdPostsMappingTable);
      })
  }

  public getAllUsers() {
    return this.users$;
  }

  public deletePost(deletedPost) {

    // console.log(deletedPost)
    // console.log(deletedPost.id)
    // console.log(this.posts$)

    // 1-vi opit...
    // this.posts$.pipe(
    //   map(mappingTable => Object.keys(mappingTable)
    //     .map(key => mappingTable[key])
    //     .filter(mappingTable => mappingTable != deletedPost)
    //     .filter(post => post.id != deletedPost.id)
    //   )
    // )
    //


    // 2-ri opit -> porednata greda...
    // this.posts$
    //   .subscribe(posts => {
    //     console.log(posts)
    //
    //     for (let post of Object.keys(posts)) {
    //       this.userIdPostsMappingTable[post].filter(p => p.id != deletedPost.id)
    //       console.log(this.userIdPostsMappingTable)
    //     }
    //
    //   })
    //
    //   this.posts$.next(this.userIdPostsMappingTable);

    // 3-ti opit - da rabotq sys stream-a ot network service-a, koeto posle ustanovih, 4e ne ok.
    // this.network.getPosts()
    //   .subscribe(posts => {
    //       console.log(posts)
    //       for (const post of posts) {
    //         const updatedPosts = posts.filter(p => p.id != deletedPost.id)
    //
    //         this.userIdPostsMappingTable[updatedPosts.userId].push(updatedPosts)
    //       }
    //
    //       this.posts$.next(this.userIdPostsMappingTable);
    //
    //     }
    //   )

    // 4-ti opit - greda. Pretty destrictive one... it deletes all posts for all users.
    // console.log(this.userIdPostsMappingTable);
    // let test: any =
    //   map(mappingTable => Object.keys(mappingTable)
    //     .map(key => mappingTable[key])
    //     .filter((p) => p.id != deletedPost.id)
    //   )
    //
    // this.userIdPostsMappingTable[deletedPost.userId].filter((p) => p.id != deletedPost.id)

    // this.posts$.next(test);

    // 5-ti opit s pomo6t ot Dani, no pak ne trie.
    let filteredPosts: Post[] = this.userIdPostsMappingTable[deletedPost.userId].filter(p => p.id != deletedPost.id)

    console.log(this.userIdPostsMappingTable[deletedPost.userId].filter(p => p.id != deletedPost.id));

    this.posts$.next(this.userIdPostsMappingTable[deletedPost.userId] = filteredPosts);
  }
}
