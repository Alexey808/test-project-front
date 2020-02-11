import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { UsersService } from '../../components/users/users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {ActionSelectUser, TypeUserActions} from '../actions/users.actions';
import { UserApiService } from '../../api/user/user.service';
import {IUser} from '../../api/user/user.interface';
import {Store} from '@ngrx/store';
// import {sGetSelectUser} from '../selectors/users.selectors';
import {Observable} from 'rxjs';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    public userApiService: UserApiService,
    private store: Store<{ users: IUser[] }>,
  ) {}

  /* надо подумать как перенести этот функционал загрузки данных в сервис */
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeUserActions.LOAD_USERS),
      switchMap(() => this.userApiService.getUsers()
        .pipe(
          map(users => ({type: TypeUserActions.LOAD_USERS_SUCCESS, payload: users}))
        )
      )
    )
  );

  // addUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeUserActions.SELECT_USER),
  //     switchMap((action: ActionSelectUser) => {
  //
  //
  //       return this.userApiService.s(action.payload).pipe(
  //         tap((addedUser) => console.log('addUser$ effect', addedUser))
  //         // map((user) => ())
  //         //   map(res => ({payload: res}))
  //       )
  //     }
  //
  //     )
  //   )
  // );
}



