import { Action } from '@ngrx/store';
import { IUser } from '../../api/user/user.interface';

export enum EnumUserActions {
  GET_USERS = '[Users] Get Users',
  ADD_USER = '[Users] Add User',
  SELECT_USER = '[User] User select',
}

export class GetUsers implements Action {
  public readonly type = EnumUserActions.GET_USERS;
}

export class AddUsers implements Action {
  public readonly type = EnumUserActions.ADD_USER;
  constructor(public payload: IUser) {}
}

export class SelectedUser implements Action {
  public readonly type = EnumUserActions.SELECT_USER;
  constructor(public payload: IUser) {}
}

export type Action = GetUsers | AddUsers | SelectedUser;
