import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {delay} from 'rxjs/operators'

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  public userId;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
      })

  }

  ngOnInit(): void {
  }

}
