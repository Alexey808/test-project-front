import { Injectable } from '@angular/core';
import { UserService } from '../../api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userService: UserService
  ) { }

  getUsers() {
    const users = this.userService.getUsers();
    console.log('users.service -> getUsers -> ', users);
    return users;
  }

  // getUser() {}
  // createUser() {}
  // deleteUser() {}
  // updateUser() {}
}
