import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable, Subscription} from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { Store} from '@ngrx/store';
import { sGetAllUsers } from '../../store/selectors/users.selectors';
import { ActionAddUsers, ActionGetUsers, ActionSelectedUser } from '../../store/actions/users.actions';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  selectedUser: IUser;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<{ users: IUser[] }>,
    private userApiService: UserApiService,
  ) {
    this.store.dispatch(new ActionGetUsers());
  }

  ngOnInit(): void {
    this.users$ = this.store.select(sGetAllUsers);
  }

  editUser(user: IUser): void {
    this.store.dispatch(new ActionSelectedUser(user));
  }

  // getUser({id}: IUser): void {
  //   this.subscription.add(
  //     this.userApiService.getUser(id).subscribe()
  //   );
  // }

  addUser({name}: IUser): void {
    const user: Omit<IUser, 'id'> = { name };
    this.subscription.add(
      // спрятать обращение к userApiService в миделвер
      this.userApiService.addUser(user).subscribe((res: IUser) => {
        this.store.dispatch(new ActionAddUsers(res));
      })
    );
  }

  // saveUser({id, name}: IUser): void {
  //   this.subscription.add(
  //     this.userApiService.updateUser({id , name}).subscribe()
  //   );
  //
  //   const users$: Observable<IUser[]> = this.users$;
  //   this.users$ = users$.pipe(
  //     switchMap((users: IUser[]) => users),
  //     toArray()
  //   );
  // }

  // deleteUser({id}: IUser): void {
  //   this.subscription.add(
  //     this.userApiService.deleteUser(id).subscribe()
  //   );
  //
  //   const users$: Observable<IUser[]> = this.users$;
  //   this.users$ = users$.pipe(
  //     switchMap((users: IUser[]) => users),
  //     toArray()
  //   );
  // }

  // deleteAllUsers(): void {
  //   this.subscription.add(
  //     this.userApiService.deleteAllUsers().subscribe()
  //   );
  //
  //   const users$: Observable<IUser[]> = this.users$;
  //   this.users$ = users$.pipe(
  //     switchMap((users: IUser[]) => users),
  //     toArray()
  //   );
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
