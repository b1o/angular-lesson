import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/networking/network.service';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit, OnChanges {

  userId: number;
  postTitle: string;
  postBody: string;

  testCOunter = 0;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.route.paramMap.subscribe(
      params =>  {
        console.log('params')
        this.userId = +params.get('id')
      }
    )
   }

  ngOnInit(): void {

  }

  test() {
    this.testCOunter++
  }

  ngOnChanges() {
    console.log('on changes')
  }

  onAddPost() {
    const post: Post = {
      title: this.postTitle,
      body: this.postBody,
      userId: this.userId,
      likes: 0
    }

    this.dataService.createPostForUser(this.userId, post);
    this.router.navigateByUrl(`/users/${this.userId}`);
  }

}
