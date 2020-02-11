import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { UserEffects } from './user.effects';


@NgModule({
  imports: [
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UserEffectsModule {}
