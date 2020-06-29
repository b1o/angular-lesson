import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {

  private baseUrl =  'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(this.baseUrl + 'users')
  }

  public getPosts() {

  }
}
