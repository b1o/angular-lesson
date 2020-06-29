import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    NetworkService
  ]
})
export class NetworkingModule { }
