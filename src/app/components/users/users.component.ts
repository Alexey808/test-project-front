import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}];

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {}

  getUsers() {
    const users = this.usersService.getUsers() || this.users;
    console.log('user.component -> users -> ', users);
    return users;
  }
}
