import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../api/user/user.interface';
import { Store} from '@ngrx/store';
import { share, tap } from 'rxjs/operators';
import { ActionAddUser, ActionDeleteUser, ActionDeleteUsers, ActionGetUsers, ActionUpdateUsers } from '../../store/actions/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private userApiService: UserApiService,
    private store: Store<{ users: IUser[] }>
  ) { }

  public dataUsers$ = this.userApiService.getUsers().pipe(
    tap((users: IUser[]) => {
      this.store.dispatch(new ActionGetUsers(users));
    }),
    share()
  );

  addUser(newUser: IUser): Observable<IUser> {
    return this.userApiService.addUser(newUser).pipe(
      tap((users) => this.store.dispatch(new ActionAddUser(users)))
    );
  }

  saveUser(newUsers: IUser[]): Observable<IUser[]> {
    return this.userApiService.updateUsers(newUsers).pipe(
      tap(() => this.store.dispatch(new ActionUpdateUsers(newUsers))),
    );
  }

  deleteUser(deleteUser: IUser): Observable<IUser> {
    return this.userApiService.deleteUser(deleteUser.id).pipe(
      tap(() => this.store.dispatch(new ActionDeleteUser(deleteUser)))
    );
  }

  deleteAllUsers(): Observable<IUser[]> {
    return this.userApiService.deleteAllUsers().pipe(
      tap(() => this.store.dispatch(new ActionDeleteUsers()))
    );
  }
}
