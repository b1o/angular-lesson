import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Post} from '../models/post';

@Component({
  selector: 'app-popular-posts-page',
  templateUrl: './popular-posts-page.component.html',
  styleUrls: ['./popular-posts-page.component.scss']
})
export class PopularPostsPageComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  onDeletePost(post: Post){
    this.data.removePost(post.id, post.userId);
  }
}
