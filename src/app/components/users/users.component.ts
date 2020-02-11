import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { from, Observable, Subscription} from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { select, Store } from '@ngrx/store';
import { sGetAllUsers } from '../../store/selectors/users.selectors';
import {
  ActionAddUser,
  ActionDeleteUser,
  ActionDeleteUsers,
  ActionLoadUsers,
  ActionUpdateUsers
} from '../../store/actions/users.actions';
import { UsersService } from './users.service';
import { filter, map, share, switchMap, tap, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  selectUser: IUser;
  subscription: Subscription = new Subscription();
  userEditIds: string[] = [];

  constructor(
    private store: Store<{ users: IUser[], selectUser: IUser }>,
    private userApiService: UserApiService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.dataUsers$;
  }

  editUser(user: IUser): void {
    this.selectUser = user;
  }

  getUser({id}: IUser): void {
    this.subscription.add(
      this.userApiService.getUser(id).pipe(
        // tslint:disable-next-line:no-console
        tap((user: IUser) => console.info('User test load: ', user))
      ).subscribe()
    );
  }

  addUser({name}: IUser): void {
    const newUser: IUser = {name, id: ''};
    this.subscription.add(
      this.userApiService.addUser(newUser).subscribe((res: IUser) => {
        this.store.dispatch(new ActionAddUser(res));
      })
    );
  }

  editSelectedUser(updatedUser: IUser) {
    if (!this.userEditIds.includes(updatedUser.id)) {
      this.userEditIds.push(updatedUser.id);
    }

    this.users$ = this.users$.pipe(
      switchMap((users: IUser[]) => from(users).pipe(
        map((user: IUser) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
        toArray()
      ))
    );
  }

  saveUser(): void {
    // фильтруем тех пользователей которые были изменены
    const newUsers$ = this.users$.pipe(
      switchMap((users: IUser[]) => from(users).pipe(
        filter((user: IUser) =>
          this.userEditIds.includes(user.id)
        ),
        toArray()
      ))
    );

    // вытаскиваем их
    let newUsers = [];
    this.subscription.add(
      newUsers$.subscribe((users: IUser[]) => newUsers = users),
    );

    // отправляем
    if (!!newUsers.length) {
      this.subscription.add(
        this.userApiService.updateUsers(newUsers).subscribe((res: IUser[]) => {
          this.store.dispatch(new ActionUpdateUsers(res));
        })
      );
    }

  }

  deleteUser({id}: IUser): void {
    this.users$ = this.users$.pipe(
      switchMap((users: IUser[]) => from(users).pipe(
        filter((user) => user.id !== id),
        toArray()
      ))
    );

    this.subscription.add(
      this.userApiService.deleteUser(id).subscribe((res: IUser) => {
        this.store.dispatch(new ActionDeleteUser(res));
      })
    );
  }

  deleteAllUsers(): void {
    this.subscription.add(
      this.userApiService.deleteAllUsers().subscribe(() => {
        this.store.dispatch(new ActionDeleteUsers());
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
