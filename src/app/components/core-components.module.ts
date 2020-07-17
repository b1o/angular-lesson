import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TimerComponent } from './timer/timer.component';



@NgModule({
  declarations: [NavbarComponent, TimerComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CoreComponentsModule { }
