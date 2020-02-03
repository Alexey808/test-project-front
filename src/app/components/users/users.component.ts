import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable, Subscription} from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import {select, Store} from '@ngrx/store';
import { sGetAllUsers } from '../../store/selectors/users.selectors';
import {
  ActionAddUsers,
  ActionDeleteUser, ActionDeleteUsers,
  ActionGetUsers,
  ActionLoadUsers,
  ActionSelectUser,
  ActionUpdateUser
} from '../../store/actions/users.actions';
import {UsersService} from './users.service';
import {share, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  selectUser: IUser;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<{ users: IUser[], selectUser: IUser }>,
    private userApiService: UserApiService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ActionLoadUsers());
    this.users$ = this.store.select(sGetAllUsers);
  }

  editUser(user: IUser): void {
    this.store.dispatch(new ActionSelectUser(user));
  }

  // getUser({id}: IUser): void {
  //   this.subscription.add(
  //     this.userApiService.getUser(id).subscribe()
  //   );
  // }

  addUser({name}: IUser): void {
    const newUser: IUser = {name, id: ''};
    this.subscription.add(
      this.userApiService.addUser(newUser).subscribe((res: IUser) => {
        this.store.dispatch(new ActionAddUsers(res));
      })
    );
  }

  saveUser(user: IUser): void {
    this.subscription.add(
      this.userApiService.updateUser(user).subscribe((res: IUser) => {
        this.store.dispatch(new ActionUpdateUser(res));
      })
    );
  }

  deleteUser({id}: IUser): void {
    this.subscription.add(
      this.userApiService.deleteUser(id).subscribe((res: IUser) => {
        this.store.dispatch(new ActionDeleteUser(res));
      })
    );
  }

  deleteAllUsers(): void {
    this.subscription.add(
      this.userApiService.deleteAllUsers().subscribe(() => {
        this.store.dispatch(new ActionDeleteUsers());
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
