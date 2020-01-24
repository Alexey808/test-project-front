import { Component, OnInit } from '@angular/core';
import { IUser } from '../../api/user/user.interface';
import { Observable } from 'rxjs';
import { UserApiService } from '../../api/user/user.service';
import { switchMap, toArray } from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;
  selectedUser: IUser = {id: '', name: ''};
  userForm: FormGroup;

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
        ])
      })
    });

    // this.userForm.get('userName').valueChanges.subscribe(value => {
    //   console.log(value);
    // });

    this.userForm.get('baseInfo').setValue({ userName: 'test'});
  }

  editUser(user: IUser): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.users$ = this.userApiService.getUsers();
  }

  getUser(userId: string): void {
    this.userApiService.getUser(userId).subscribe();
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

  saveUser(): void {
    const { id, name } = this.selectedUser;
    if (!id || !name) { return; }

    this.userApiService.updateUser({id , name}).subscribe();
    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );
  }

  deleteUser(id: string): void {
    // console.log(this.userForm);
    // this.userForm.setControl({value: this.use})

    if (!id) { return; }

    this.userApiService.deleteUser(id).subscribe();
    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );

    // this.selectedUser = { id: '', name: '' };

    this.userForm.get('baseInfo').reset();
  }

  deleteAllUsers(): void {
    this.userApiService.deleteAllUsers().subscribe();
    const users$: Observable<IUser[]> = this.users$;
    this.users$ = users$.pipe(
      switchMap((users: IUser[]) => users),
      toArray()
    );

    this.selectedUser = { id: '', name: '' };

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
}
