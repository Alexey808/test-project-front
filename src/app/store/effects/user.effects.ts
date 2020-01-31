import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { UsersService } from '../../components/users/users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import { TypeUserActions } from '../actions/users.actions';
import { UserApiService } from '../../api/user/user.service';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    public userApiService: UserApiService,
  ) {}

  // todo подумать. данный эффект поржадает 2 экшина и 2 редьюса для одной операции (загрузки данных)
  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeUserActions.LOAD_USERS),
  //     switchMap(() => this.userApiService.getUsers()
  //       .pipe(
  //         map(users => ({type: TypeUserActions.LOAD_USERS_SUCCESS, payload: users}))
  //       )
  //     )
  //   )
  // );

  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeUserActions.LOAD_USERS),
  //     tap(
  //       this.userApiService.getUsers()
  //     )
  //     switchMap(() => this.userApiService.getUsers()
  //       .pipe(
  //         map(users => ({type: TypeUserActions.LOAD_USERS_SUCCESS, payload: users}))
  //       )
  //     )
  //   )
  // );


  // addUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeUserActions.ADD_USER),
  //     switchMap((user) => this.userApiService.addUser(user)
  //       .pipe(
  //         map(user => ({payload: user}))
  //       )
  //     )
  //   )
  // );
}



