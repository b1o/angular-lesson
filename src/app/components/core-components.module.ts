import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReverseStringPipe } from './pipes/reverse-string.pipe';
import { PhoneInputComponent } from './phone-input/phone-input.component';

@NgModule({
  declarations: [NavbarComponent, PhoneInputComponent],
  exports: [NavbarComponent, PhoneInputComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class CoreComponentsModule {}
