import { Component, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import {forkJoin, from, merge, Observable} from 'rxjs';
import {UserApiService} from '../../api/user/user.service';
import {map, mergeAll, mergeMap, share, switchMap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;
  selectedUser: IUser = {id: '0', name: ''};
  name = '';

  constructor(
    private userApiService: UserApiService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.users$ = await this.userApiService.getUsers();
  }

  editUser(user: IUser) {
    this.selectedUser = user;
  }

  async addUser() {
    const name = this.selectedUser.name || '';
    if (!name) { return; }

    const user: Omit<IUser, 'id'> = { name };
    const addedUser$: Observable<IUser> = await this.userApiService.addUser(user);

    addedUser$.subscribe();

    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users) => users),
      toArray()
    );
  }


  async deleteUser(id: string) {
    await this.userApiService.deleteUser(id);
    this.getUsers();
  }

  async saveUser() {}
  // async getUser(userId) {
  //   const $user = await this.usersService.getUser(userId);
  // }
}
