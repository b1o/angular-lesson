import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreComponentsModule } from './components/core-components.module';
import { HttpClientModule } from '@angular/common/http';
import { NetworkingModule } from './networking/networking.module';
import { ReverseStringPipe } from './components/pipes/reverse-string.pipe';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreComponentsModule,
    NetworkingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
