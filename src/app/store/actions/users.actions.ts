import { Action } from '@ngrx/store';
import { IUser } from '../../api/user/user.interface';

export enum TypeUserActions {
  ADD_USER = '[Users] add user',
  SELECT_USER = '[Users] select user',
  LOAD_USERS = '[Users] load users',
  LOAD_USERS_SUCCESS = '[Users] load users success',
  UPDATE_USER = '[Users] update user',
  DELETE_USER = '[Users] delete user',
  DELETE_USERS = '[Users] delete users'
}

export class ActionLoadUsers implements Action {
  public readonly type = TypeUserActions.LOAD_USERS;
}

export class ActionGetUsers implements Action {
  public readonly type = TypeUserActions.LOAD_USERS_SUCCESS;
  constructor(public payload: IUser[]) {}
}

export class ActionAddUsers implements Action {
  public readonly type = TypeUserActions.ADD_USER;
  constructor(public payload: IUser) {}
}

export class ActionSelectedUser implements Action {
  public readonly type = TypeUserActions.SELECT_USER;
  constructor(public payload: IUser) {}
}

export class ActionUpdateUser implements Action {
  public readonly type = TypeUserActions.UPDATE_USER;
  constructor(public payload: IUser) {}
}

export class ActionDeleteUser implements Action {
  public readonly type = TypeUserActions.DELETE_USER;
  constructor(public payload: IUser) {}
}

export class ActionDeleteUsers implements Action {
  public readonly type = TypeUserActions.DELETE_USERS;
}


export type Action = ActionGetUsers
  | ActionAddUsers
  | ActionSelectedUser
  | ActionLoadUsers
  | ActionUpdateUser
  | ActionDeleteUser
  | ActionDeleteUsers;
