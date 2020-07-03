import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkService} from "../../../networking/network.service";

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss']
})
export class AddNewPostComponent implements OnInit {

  title: string;
  body: string;
  userId: string;

  constructor(private network: NetworkService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      })
  }

  ngOnInit(): void {
  }

  onCreatePost() {
    this.network.createPost(this.title, this.body, this.userId)
      .subscribe(result => {
      console.log(result);
    })
  }
}
