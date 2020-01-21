import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { IUser } from '../../api/user/user.interface';
import {forkJoin, from, merge, Observable} from 'rxjs';
import {UserApiService} from '../../api/user/user.service';
import {map, mergeAll, mergeMap, share, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // users: IUser[] = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}];

  users$: Observable<IUser[]>;
  selectedUser: IUser = {id: '0', name: ''};
  name = '';
  constructor(
    private userApiService: UserApiService
  ) { }

  ngOnInit() {
    this.getUsers();



    // const one$ = from([1, 2]);
    // const two$ = from([3, 4]);
    // const result = merge(one$, two$);
    // result.subscribe((item) => {
    //   debugger
    //   console.log(item);
    // });
  }

  async getUsers() {
    this.users$ = await this.userApiService.getUsers();
    // const users = await this.userApiService.getUsers();
    // const u = forkJoin(users);
    // u.subscribe((item) => console.log('u item -> ', item));
    // console.log('u -> ', u);
    // this.users$.pipe(forkJoin);

    // this.users$.subscribe((items) => console.log('--->>>', from(items)));

    // this.users$.subscribe(
    //   (items) => from(items).subscribe(
    //     (item) => console.log('i -> ', item)
    //   )
    // );

    const test = this.users$.pipe(
      map(users => forkJoin(users))
    );


    this.users$.subscribe((y) => console.log('y -> ', y));

  }

  editUser(user: IUser) {
    this.selectedUser = user;
  }

  async addUser() {
    const name = this.selectedUser.name || '';
    if (!name) { return; }



    const user: Omit<IUser, 'id'> = { name };
    const addedUser$ = await this.userApiService.addUser(user);
    const updatedUserList$ = merge(this.users$, addedUser$.pipe(toArray()));
    //this.users$ = updatedUserList$;


    updatedUserList$.subscribe((item) => {
      debugger;
      console.log('sb1 -->>', item);
    });
    this.users$.subscribe((item) => console.log('sb2 -->>', item));
    // console.log('component', addedUser$);
    this.getUsers();
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
