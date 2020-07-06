import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-popular-posts-page',
  templateUrl: './popular-posts-page.component.html',
  styleUrls: ['./popular-posts-page.component.scss']
})
export class PopularPostsPageComponent implements OnInit {

  constructor(public  data: DataService) { }

  ngOnInit(): void {
  }

}
