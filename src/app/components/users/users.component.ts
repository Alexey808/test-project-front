import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable, Subscription} from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { switchMap, toArray } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  userForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();

    this.userForm = new FormGroup({
      baseInfo: new FormGroup({
        userName: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.required
        ]),
        userId: new FormControl('', [])
      })
    });


    // todo попробовать вынести форму в отедльный компонент и от туда output(тить), что должно помочь избавится от нижнией подписки
    this.subscription.add(
      this.userForm.get('baseInfo').valueChanges.subscribe()
    );
  }

  editUser(user: IUser): void {
    this.userForm.get('baseInfo').setValue({userName: user.name, userId: user.id});
  }

  getUsers(): void {
    this.users$ = this.userApiService.getUsers();
  }

  getUser(userId: string): void {
    this.subscription.add(
      this.userApiService.getUser(userId).subscribe()
    );
  }

  addUser(): void {
    const name = this.getUserParams('name');
    if (!name) { return; }

    const user: Omit<IUser, 'id'> = { name };

    this.subscription.add(
      this.userApiService.addUser(user).subscribe()
    );

    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );
  }

  saveUser(): void {
    const { userId: id , userName: name } = this.userForm.get('baseInfo').value;
    if (!id || !name) { return; }

    this.subscription.add(
      this.userApiService.updateUser({id , name}).subscribe()
    );

    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );
  }

  deleteUser(id: string): void {
    if (!id) { return; }

    this.subscription.add(
      this.userApiService.deleteUser(id).subscribe()
    );

    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );

    // this.selectedUser = { id: '', name: '' };

    this.resetUserForm();
  }

  deleteAllUsers(): void {
    this.subscription.add(
      this.userApiService.deleteAllUsers().subscribe()
    );

    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );

    this.resetUserForm();
  }

  resetUserForm(): void {
    this.userForm.get('baseInfo').reset();
  }

  // private customValidatorName() {
  //   return (control: AbstractControl): {[key: string]: any} => {
  //     if (!control.touched) {
  //       return null;
  //     } else {
  //       return this.userForm.baseInfo
  //     }
  //   }
  // }

  getUserParams(property) {
    switch (property) {
      case 'id':
        return this.userForm.get('baseInfo').value.userId || '';
      case 'name':
        return this.userForm.get('baseInfo').value.userName || '';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
