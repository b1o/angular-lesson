import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user = {
    userName: 'pesho',
    email: 'pesho@mail.bg',
    avatarPhoto: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
