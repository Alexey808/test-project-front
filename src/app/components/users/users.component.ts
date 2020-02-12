import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { from, Observable, Subject } from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { select, Store } from '@ngrx/store';
import { sGetAllUsers } from '../../store/selectors/users.selectors';
import { UsersService } from './users.service';
import { filter, map, switchMap, takeUntil, tap, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  selectUser: IUser;
  userEditIds: string[] = [];

  private destroyStream = new Subject<void>();

  constructor(
    private store: Store<{ users: IUser[], selectUser: IUser }>,
    private userApiService: UserApiService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersService.dataUsers$.pipe(
      takeUntil(this.destroyStream)
    ).subscribe();
    this.users$ = this.store.select(sGetAllUsers);
  }

  editUser(user: IUser): void {
    this.selectUser = user;
  }

  getUser({id}: IUser): void {
    this.userApiService.getUser(id).pipe(
      takeUntil(this.destroyStream),
      // tslint:disable-next-line:no-console
      tap((user: IUser) => console.info('User test load: ', user))
    ).subscribe();
  }

  addUser({name}: IUser): void {
    const newUser: IUser = {name, id: ''};

    this.usersService.addUser(newUser).pipe(
      takeUntil(this.destroyStream)
    ).subscribe();
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

    newUsers$.pipe(
      takeUntil(this.destroyStream)
    ).subscribe((users: IUser[]) => newUsers = users);

    // отправляем
    if (!!newUsers.length) {
      this.usersService.saveUser(newUsers).pipe(
        takeUntil(this.destroyStream)
      ).subscribe();
    }
  }

  deleteUser(deleteUser: IUser): void {
    this.users$ = this.users$.pipe(
      switchMap((users: IUser[]) => from(users).pipe(
        filter((user: IUser) => user.id !== deleteUser.id),
        toArray()
      ))
    );

    this.usersService.deleteUser(deleteUser).pipe(
      takeUntil(this.destroyStream)
    ).subscribe();
  }

  deleteAllUsers(): void {
    this.usersService.deleteAllUsers().pipe(
      takeUntil(this.destroyStream)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
  }
}
