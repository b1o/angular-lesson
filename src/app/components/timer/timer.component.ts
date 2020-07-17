import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  timer = 0;

  timerSub: Subscription;
  timer$: Observable<number>;
  paused = false;

  constructor() {
    this.timer$ = interval(1000).pipe(tap((_) => console.log('timer')));
  }

  ngOnInit(): void {}

  private timerObserver() {
    this.timer++;
  }

  start() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    if (this.paused) {
      this.paused = false;
    }

    this.timerSub = this.timer$.subscribe(() => this.timerObserver());
  }

  pause() {
    if (!this.paused) {
      if (this.timerSub) {
        this.timerSub.unsubscribe();
      }
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      this.timerSub = this.timer$.subscribe(() => this.timerObserver());
    }
  }

  reset() {
    this.paused = false;
    this.pause();
    this.timer = 0;
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
