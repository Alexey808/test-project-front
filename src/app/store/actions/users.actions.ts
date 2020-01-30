import { Action } from '@ngrx/store';
import { IUser } from '../../api/user/user.interface';

export enum TypeUserActions {
  GET_USERS = '[Users] get users',
  ADD_USER = '[Users] add user',
  SELECT_USER = '[Users] select user',
  LOAD_USERS = '[Users] load users',
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

export class ActionLoadUsers implements Action {
  public readonly type = TypeUserActions.LOAD_USERS;
  constructor(public payload: IUser[]) {}
}

export type Action = ActionGetUsers | ActionAddUsers | ActionSelectedUser | ActionLoadUsers;
