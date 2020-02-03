import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from '../users/users.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    UsersModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
