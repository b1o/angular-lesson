import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-observable-page',
  templateUrl: './observable-page.component.html',
  styleUrls: ['./observable-page.component.scss'],
})
export class ObservablePageComponent implements OnInit {
  dropdownVisible = false;

  constructor() {}

  ngOnInit(): void {}
}
