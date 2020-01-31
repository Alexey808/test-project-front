import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../../api/user/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() users$: Observable<IUser[]>;
  // @Input() selectedUser: IUser = {id: '', name: ''};

  @Output() eventAddUser = new EventEmitter();
  @Output() eventEditUser = new EventEmitter();
  @Output() eventDeleteUser = new EventEmitter();
  @Output() eventDeleteUsers = new EventEmitter();
  @Output() eventGetUser = new EventEmitter();

  userForm: FormGroup;

  constructor() { }

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser) {
      this.userForm.get('baseInfo').setValue({
        userId: changes.selectedUser.currentValue.id,
        userName: changes.selectedUser.currentValue.name
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
    const { userId: id , userName: name } = this.userForm.get('baseInfo').value;
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

}
