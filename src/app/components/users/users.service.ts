import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';
import {combineLatest, Observable} from 'rxjs';
import {IUser} from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {sGetAllUsers} from '../../store/selectors/users.selectors';
import {filter, share, switchMap, tap} from 'rxjs/operators';
import {ActionGetUsers, ActionLoadUsers} from '../../store/actions/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private userApiService: UserApiService,
    private store: Store<{ users: IUser[] }>
  ) { }

  public users$ = this.store.pipe(
    switchMap(() => this.userApiService.getUsers()),
    tap((users) => this.store.dispatch(new ActionGetUsers(users))),
    share()
  );






  // getUsers() {
  //   return this.userApiService.getUsers();
  // }
  //
  // getUser(id) {
  //   return this.userApiService.getUser(id);
  // }
  //
  // addUser(user) {
  //   return this.userApiService.addUser(user);
  // }

  // deleteUser() {}
  // updateUser() {}
}
