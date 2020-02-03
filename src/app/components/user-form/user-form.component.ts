import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { IUser } from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {ActionSelectUser} from '../../store/actions/users.actions';
import {sGetSelectUser} from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() users$: Observable<IUser[]>;
  // @Input() selectUser: IUser = {id: '', name: ''};

  @Output() eventAddUser = new EventEmitter();
  @Output() eventEditUser = new EventEmitter();
  @Output() eventDeleteUser = new EventEmitter();
  @Output() eventDeleteUsers = new EventEmitter();
  @Output() eventGetUser = new EventEmitter();

  userForm: FormGroup;
  subscription: Subscription = new Subscription();
  // selectUser: IUser;

  constructor(
    private store: Store<{ users: IUser[], selectUser: IUser }>,
  ) {

  }

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


    this.subscription.add(
      this.store.pipe(
        select(sGetSelectUser)
      ).subscribe((user) => {
        this.userForm.get('baseInfo').setValue({
          userId: user.id,
          userName: user.name
        });
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.selectUser) {
    //   this.userForm.get('baseInfo').setValue({
    //     userId: changes.selectUser.currentValue.id,
    //     userName: changes.selectUser.currentValue.name
    //   });
    // }
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
