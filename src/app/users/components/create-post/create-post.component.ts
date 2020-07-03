import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../../networking/network.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  userId;
  title;
  body;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      });
  }
  ngOnInit(): void {
  }

}
