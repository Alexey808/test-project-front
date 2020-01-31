import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';
import {combineLatest, Observable} from 'rxjs';
import {IUser} from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {sGetAllUsers} from '../../store/selectors/users.selectors';
import {filter, map, share, switchMap, tap} from 'rxjs/operators';
import {ActionGetUsers} from '../../store/actions/users.actions';
import {muteFirst} from '../../api/helper/mute-first-observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private userApiService: UserApiService,
    private store: Store<{ users: IUser[] }>
  ) { }

  /* Попытка избавится от загрузки данных в сайдэффекте ngrx */
  // public loadUsers$ = this.store.pipe(
  //   switchMap(() => this.userApiService.getUsers()),
  //   tap((users) => this.store.dispatch(new ActionGetUsers(users))),
  //   share()
  // );
  // public users$ = muteFirst(
  //   this.loadUsers$,
  //   this.store.pipe(select(sGetAllUsers))
  // );
}
