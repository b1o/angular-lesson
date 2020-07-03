import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/networking/network.service';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {

  userId: number;
  postTitle: string;
  postBody: string;


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
  onAddPost() {
    const post: Post = {
      title: this.postTitle,
      body: this.postBody,
      userId: this.userId
    }

    this.dataService.createPostForUser(this.userId, post);
    this.router.navigateByUrl(`/users/${this.userId}`);
  }

}
