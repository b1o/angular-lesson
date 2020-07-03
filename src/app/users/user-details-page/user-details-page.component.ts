import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../networking/network.service';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Post} from '../models/post';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;
  public user$: Observable<User>;
  public posts$: Observable<Post[]>;

  constructor(private activatedRoute: ActivatedRoute, private network: NetworkService, private router: Router) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      });

    this.user$ = this.network.getUserById(this.userId);
    this.posts$ = this.network.getPostsByUserId(this.userId);
  }
  navigateToCreate(){
    this.router.navigateByUrl('users/' + this.userId + '/create/');
  }
  ngOnInit(): void {
  }

}
