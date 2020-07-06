import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../users/models/user';
import { Post } from '../users/models/post';

@Injectable()
export class NetworkService {

  private baseUrl =  'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'users')
  }

  public getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + 'users/' + id )
  }

  public getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts');
  }

  public getPostsByUserId(userId: number) {
    return this.http.get<Post[]>(this.baseUrl + 'posts',  {params: {'userId': userId.toString()}})
  }

  public createPost(postTitle, postBody, userId) {
    const data = {
      title: postTitle,
      body: postBody,
      userId: userId
    };

    return this.http.post<Post>(this.baseUrl + 'posts', data)
  }

  public updatePost(postId, changes)  {
    return this.http.patch(this.baseUrl + 'posts/' + postId,  changes)
  }

}
