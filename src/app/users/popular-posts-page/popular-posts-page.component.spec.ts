import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPostsPageComponent } from './popular-posts-page.component';

describe('PopularPostsPageComponent', () => {
  let component: PopularPostsPageComponent;
  let fixture: ComponentFixture<PopularPostsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularPostsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
