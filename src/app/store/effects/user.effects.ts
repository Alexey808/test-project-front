import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../components/users/users.service';
import { map, switchMap} from 'rxjs/operators';
import { TypeUserActions } from '../actions/users.actions';
import { UserApiService } from '../../api/user/user.service';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    public userApiService: UserApiService,
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeUserActions.GET_USERS),
      switchMap(() => this.userApiService.getUsers()
        .pipe(
          map(users => ({type: TypeUserActions.LOAD_USERS, payload: users}))
        )
      )
    )
  );
}



