import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  deletePost(){
    this.delete.emit();
  }
}
