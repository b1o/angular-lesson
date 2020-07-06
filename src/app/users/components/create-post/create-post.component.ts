import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../../networking/network.service';
import {Post} from '../../models/post';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  userId: number;
  title;
  body;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private dataService: DataService) {
    activatedRoute.paramMap
      .subscribe(params => {
        this.userId = + params.get('id');
      });
  }
  onAddPost(){
    const post: Post = {
      title: this.title,
      body: this.body,
      userId: this.userId,
    };
    this.dataService.createPostForUser(this.userId, post);
    this.router.navigateByUrl('users/' + this.userId);
  }
  ngOnInit(): void {
  }

}
