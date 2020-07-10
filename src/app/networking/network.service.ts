import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../users/models/user';
import {Post} from '../users/models/post';

@Injectable()
export class NetworkService {

  private baseUrl =  'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {  }

  public getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  public getUserById(id) {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  public getPostsByUserId(id){
    return this.http.get<Post[]>(this.baseUrl + 'posts', {params: {userId: id}});
  }

  public getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts');
  }

  public createPost(postTitle, postBody, postUserId){
    const data = {
      title: postTitle,
      body: postBody,
      userId: postUserId,
      likes: 0
    };
    return this.http.post<Post>(this.baseUrl + 'posts', data);
  }

  public updatePost(postId, changes){
    return this.http.put(this.baseUrl + 'posts/' + postId, changes);
  }
}
