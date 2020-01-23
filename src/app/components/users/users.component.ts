import { Component, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable } from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { switchMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;
  selectedUser: IUser = {id: '', name: ''};
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

  addUser(): void {
    const name = this.selectedUser.name || '';
    if (!name) { return; }

    const user: Omit<IUser, 'id'> = { name };

    this.userApiService.addUser(user).subscribe();
    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );
  }


  deleteUser(id: string): void {
    if (!id) { return; }

    this.userApiService.deleteUser(id).subscribe();
    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );
  }

  async saveUser() {}
  // async getUser(userId) {
  //   const $user = await this.usersService.getUser(userId);
  // }
}
