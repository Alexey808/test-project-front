import { Injectable } from '@angular/core';
import { UserApiService } from '../../api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userApiService: UserApiService
  ) { }

  getUsers() {
    const users = this.userApiService.getUsers();
    console.log('users.service -> getUsers -> ', users);
    return users;
  }

  // getUser() {}
  // createUser() {}
  // deleteUser() {}
  // updateUser() {}
}
