import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { IUser } from '../../api/user/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}];
  selectedUser: IUser = {id: 0, name: 'test0'};

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {}

  async getUsers(): Promise<IUser[]> {
    const $users = await this.usersService.getUsers();
    $users.subscribe((data: IUser[]) => {
      return this.users = [...data];
    });

    return this.users;
  }

  async getUser(userId) {
    const $user = await this.usersService.getUser(userId);
  }

  async editUser(userId) {
    this.selectedUser = this.users.find(user => user.id === userId);
  }

  async saveUser() {}

  async addUser() {
    const name = this.selectedUser.name || '';
    if (!name) { return; }

    const user: IUser = { name };
    this.usersService.addUser(user);
  }

  async deleteUser() {}
}
