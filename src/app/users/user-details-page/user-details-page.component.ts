import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../networking/network.service';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;
  public user: User;
  public posts: Post[] = [];

  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      });
    this.data.users$.subscribe(data => {
      this.user = data.find(u => u.id == this.userId);
      this.data.posts$.subscribe(postsTable => this.posts = postsTable[this.userId]);
      this.data.getPostsByUsedId(this.userId);
    });
  }
  navigateToCreate(){
    this.router.navigateByUrl('users/' + this.userId + '/create/');
  }
  ngOnInit(): void {
  }

}
