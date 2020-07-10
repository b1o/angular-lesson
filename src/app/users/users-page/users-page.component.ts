import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetworkService } from 'src/app/networking/network.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public sub: Subscription;

  constructor(private data: DataService, private router: Router) {
    const observable = new Observable((subscriber) => {
      let counter = 0;

      const intervalId = setInterval(() => {
        counter++;
        console.log('in interval', counter);
        subscriber.next(counter);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    const observer = {
      next: (value) => console.log('observer 1', value),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    };

    const observer2 = {
      complete: () => console.log('complete'),
      next: (value) => console.log('observer 2', value),
    };

    this.sub = observable.subscribe(observer);

    // setTimeout(() => {
    //   observable.subscribe(observer2);
    // }, 2000);
    this.data.getUsers().subscribe((users) => (this.users = users));
  }

  ngOnInit(): void {}

  navigateToDetails(userId) {
    console.log(userId);
    this.router.navigateByUrl('users/' + userId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
