import { Action } from '@ngrx/store';
import { IUser } from '../../api/user/user.interface';

export enum TypeUserActions {
  GET_USERS = '[Users] Get Users',
  ADD_USER = '[Users] Add User',
  SELECT_USER = '[User] User select',
}

export class ActionGetUsers implements Action {
  public readonly type = TypeUserActions.GET_USERS;
}

export class ActionAddUsers implements Action {
  public readonly type = TypeUserActions.ADD_USER;
  constructor(public payload: IUser) {}
}

export class ActionSelectedUser implements Action {
  public readonly type = TypeUserActions.SELECT_USER;
  constructor(public payload: IUser) {}
}

export type Action = ActionGetUsers | ActionAddUsers | ActionSelectedUser;
