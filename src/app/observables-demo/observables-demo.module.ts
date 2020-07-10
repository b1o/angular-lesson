import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservablePageComponent } from './observable-page/observable-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TimerComponent } from './components/timer/timer.component';

const routes: Route[] = [{ path: '', component: ObservablePageComponent }];

@NgModule({
  declarations: [ObservablePageComponent, TimerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class ObservablesDemoModule {}
