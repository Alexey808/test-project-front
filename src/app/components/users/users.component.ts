import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable, Subscription} from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { switchMap, toArray } from 'rxjs/operators';
import {Store, select} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as userActions from '../../store/actions/users.actions';


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
    private userApiService: UserApiService
  ) {
    this.users$ = store.select(fromRoot.getAllUsers);
  }

  ngOnInit(): void {
  //   this.getUsers();
  }

  editUser(user: IUser): void {
    this.store.dispatch(new userActions.SelectedUser(user));

    // @ts-ignore
    console.log('store ', this.store.source);
  }

  // getUsers(): void {
  //   this.users$ = this.userApiService.getUsers();
  // }

  // getUser({id}: IUser): void {
  //   this.subscription.add(
  //     this.userApiService.getUser(id).subscribe()
  //   );
  // }

  addUser({name}: IUser): void {

    // const user: Omit<IUser, 'id'> = { name };

    const user = { id: '1-new', name: 'example-1-new' };
    this.store.dispatch(new userActions.AddUsers(user));
    // @ts-ignore
    console.log('store ', this.store.source);


    // this.subscription.add(
    //   this.userApiService.addUser(user).subscribe()
    // );
    //
    // const users$: Observable<IUser[]> = this.users$;
    // this.users$ = users$.pipe(
    //   switchMap((users: IUser[]) => users),
    //   toArray()
    // );
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
