import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { MainModule } from './components/main/main.module';
import { MaterialModule } from './material.module';
import { GridModule } from '@angular/flex-layout/grid';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/main.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { debugReducer } from './store/reducers/debug.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers: debugReducer }),
    StoreDevtoolsModule.instrument(),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    GridModule,
    FlexLayoutModule,
    ApiModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
