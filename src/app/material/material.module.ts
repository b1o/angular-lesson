import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

const MODULES = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  exports: [
    ...MODULES
  ],
  imports: [
    CommonModule,
    ...MODULES
  ]
})
export class MaterialModule { }
