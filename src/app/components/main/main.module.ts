import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UsersComponent } from '../users/users.component';
import { FormsModule } from '@angular/forms';

import { GridModule } from '@angular/flex-layout/grid';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    GridModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
