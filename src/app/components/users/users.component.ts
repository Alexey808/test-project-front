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

  // users$: Observable<Observable<IUser>>;
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

    // // example
    // this.users$.subscribe(
    //   (items) => from(items).subscribe(
    //     (item) => console.log('i -> ', item)
    //   )
    // );
  }

  editUser(user: IUser) {
    this.selectedUser = user;
  }

  async addUser() {
    const name = this.selectedUser.name || '';
    if (!name) { return; }

    const user: Omit<IUser, 'id'> = { name };
    const addedUser$: Observable<IUser> = await this.userApiService.addUser(user);

    // todo сохраняется проблема типов, сложность с мержем стримов addedUser$ и this.users$
    const users$: Observable<IUser> = this.users$.pipe(
      switchMap((users$$) =>  merge(addedUser$, users$$))
    );
    const test$ = users$.pipe(toArray());

    this.users$ = test$;
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
