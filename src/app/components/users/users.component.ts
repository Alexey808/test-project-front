import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from './users.service';
import {Observable} from 'rxjs';
import {User} from '../../api/user/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}];

  //$users: Observable<any>;

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {}

  async getUsers() {
   // let test: any;
    const $users = await this.usersService.getUsers();

    $users.subscribe((data) => this.users = data);

    //console.log('user.component -> users -> ', test);

    return this.users;
  }
}
