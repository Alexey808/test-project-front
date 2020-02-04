import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  ViewChild, ViewChildren
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import { IUser } from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {ActionSelectUser} from '../../store/actions/users.actions';
// import {sGetSelectUser} from '../../store/selectors/users.selectors';

interface IUserFormControl {
  userId: string;
  userName: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() users$: Observable<IUser[]>;
  @Input() selectUser: IUser = {id: '', name: ''};

  @Output() eventAddUser = new EventEmitter();
  @Output() eventEditUser = new EventEmitter();
  @Output() eventSaveUser = new EventEmitter();
  @Output() eventDeleteUser = new EventEmitter();
  @Output() eventDeleteUsers = new EventEmitter();
  @Output() eventGetUser = new EventEmitter();

  userForm: FormGroup;

  constructor() {}


  ngOnInit() {
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
    this.subChangeInputName();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectUser) {
      this.userForm.get('baseInfo').setValue({
        userId: changes.selectUser.currentValue.id,
        userName: changes.selectUser.currentValue.name
      });
    }
    if (changes.user$) {
      this.users$ = changes.users$.currentValue;
    }
  }

  addUser(): void {
    const name = this.getUserParams('name');
    if (!name) { return; }
    this.eventAddUser.emit({id: '', name});
  }

  saveUser(): void {
      this.eventSaveUser.emit();
  }

  editSelectedUser(): void {
    const {userId: id , userName: name}: IUserFormControl = this.userForm.get('baseInfo').value;
    if (!id || !name) { return; }
    this.eventEditUser.emit({id , name});
  }

  deleteUser(id: string): void {
    if (!id) { return; }
    this.eventDeleteUser.emit({id, name: ''});
    this.resetUserForm();
  }

  deleteAllUsers(): void {
    this.eventDeleteUsers.emit();
    this.resetUserForm();
  }

  getUser(id: string): void {
    this.eventGetUser.emit({id, name: ''});
  }

  resetUserForm(): void {
    this.userForm.get('baseInfo').reset();
  }

  getUserParams(property: string): string {
    switch (property) {
      case 'id':
        return this.userForm.get('baseInfo').value.userId || '';
      case 'name':
        return this.userForm.get('baseInfo').value.userName || '';
      default:
        return '';
    }
  }

  subChangeInputName(): void {
    this.userForm.get('baseInfo').valueChanges.subscribe((change: IUserFormControl) => {
      if (change.userId) {
        const newUser: IUser = {
          id: this.getUserParams('id'),
          name: change.userName,
        };
        this.eventEditUser.emit(newUser);
      }
    });
  }
}
