import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { GridModule } from '@angular/flex-layout/grid';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './users.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserApiService } from '../../api/user/user.service';


@NgModule({
  declarations: [
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
    UsersComponent,
  ],
  providers: [
    UsersService,
    UserApiService,
  ]
})
export class UsersModule {}
