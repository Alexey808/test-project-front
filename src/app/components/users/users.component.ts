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
    const addedUser$ = await this.userApiService.addUser(user);
    const users$ = this.users$.pipe(
      switchMap(users$$ => users$$)
    );

    const updatedUserList$ = merge<Observable<IUser>>(  // todo type
      users$,
      addedUser$
    );
    this.users$ = updatedUserList$;
    users$.subscribe((u) => console.log('u -> ', u));
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
