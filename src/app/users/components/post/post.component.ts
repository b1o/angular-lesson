import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnChanges, OnDestroy {

  @Input() post: Post;
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  deletePost() {
    this.delete.emit(this.post)
  }

  changeTitle() {
    this.post = {...this.post, title: 'new title'}
  }

  ngOnInit(): void {

  }

}
