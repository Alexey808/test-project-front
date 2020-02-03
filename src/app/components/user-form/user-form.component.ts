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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {fromEvent, Observable, Subscription} from 'rxjs';
import { IUser } from '../../api/user/user.interface';
import {select, Store} from '@ngrx/store';
import {ActionSelectUser} from '../../store/actions/users.actions';
// import {sGetSelectUser} from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() users$: Observable<IUser[]>;
  @Input() selectUser: IUser = {id: '', name: ''};

  @Output() eventAddUser = new EventEmitter();
  @Output() eventEditUser = new EventEmitter();
  @Output() eventDeleteUser = new EventEmitter();
  @Output() eventDeleteUsers = new EventEmitter();
  @Output() eventGetUser = new EventEmitter();

  // @ViewChild('inputName', {static: false}) hrefInputName: ElementRef<any>;
  @ViewChild('inputName', {static: false}) refInputName: ElementRef;

  userForm: FormGroup;

  constructor() {}

  ngAfterViewInit(): void {
    // this.userForm.get('baseInfo').value

    this.subChangeInputName();
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

  subChangeInputName(): void {
    const refInputName$: Observable<ElementRef> = fromEvent(this.refInputName.nativeElement, 'input');
    refInputName$.subscribe((e: ElementRef<any>) => {
      this.eventEditUser.emit({
        id: this.getUserParams('id'),
        name: e.refInputName.value
      });
    });
  }

  changeInput(e) {
    console.log(this.inputName, e);

    console.log('2inputname = ', this.inputName);
  }
}
