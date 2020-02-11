import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';
import {combineLatest, Observable} from 'rxjs';
import {IUser} from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {sGetAllUsers} from '../../store/selectors/users.selectors';
import {distinctUntilChanged, filter, map, share, switchMap, tap} from 'rxjs/operators';
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


  // public dataUsers$ = this.userApiService.getUsers().pipe(
  //   distinctUntilChanged(),
  //   tap((users) => this.store.dispatch(new ActionGetUsers(users))),
  //   share()
  // );

  public dataUsers$ =  this.userApiService.getUsers().pipe(
    distinctUntilChanged(),
    tap((users) => this.store.dispatch(new ActionGetUsers(users))),
    share()
  );
}
