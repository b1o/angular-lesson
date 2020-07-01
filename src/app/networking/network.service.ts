import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../users/models/user';

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

  public getPosts() {
    return this.http.get(this.baseUrl + 'posts');
  }

  public createPost(postTitle, postBody, postUserId){
    const data = {
      title: postTitle,
      body: postBody,
      userId: postUserId
    };
    return this.http.patch(this.baseUrl + 'posts', data);
  }

  public updatePost(postId, changes){
    return this.http.put(this.baseUrl + 'posts/' + postId, changes);
  }
}
