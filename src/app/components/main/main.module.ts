import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UsersComponent } from '../users/users.component';
import { FormsModule } from '@angular/forms';

import { GridModule } from '@angular/flex-layout/grid';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserFormComponent} from '../user-form/user-form.component';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GridModule,
    FlexLayoutModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
