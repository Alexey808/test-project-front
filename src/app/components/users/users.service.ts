import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';
import {Observable} from 'rxjs';
import {IUser} from '../../api/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //users: IUser[] = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}];

  constructor(
    private userApiService: UserApiService
  ) { }

  getUsers() {
    return this.userApiService.getUsers();
  }

  getUser(id) {
    return this.userApiService.getUser(id);
  }

  addUser(user) {
    return this.userApiService.addUser(user);
  }

  // deleteUser() {}
  // updateUser() {}
}
