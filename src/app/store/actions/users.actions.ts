import { Action } from '@ngrx/store';
import { IUser } from '../../api/user/user.interface';

export enum TypeUserActions {
  ADD_USER = '[Users] add user',
  SELECT_USER = '[Users] select user',
  LOAD_USERS = '[Users] load users',
  LOAD_USERS_SUCCESS = '[Users] load users success',
  UPDATE_USER = '[Users] update user',
  UPDATE_USERS = '[Users] update users',
  DELETE_USER = '[Users] delete user',
  DELETE_USERS = '[Users] delete users'
}

/* Загрузить пользователей*/
export class ActionLoadUsers implements Action {
  public readonly type = TypeUserActions.LOAD_USERS;
}

/* Получить пользователей из стора */
export class ActionGetUsers implements Action {
  public readonly type = TypeUserActions.LOAD_USERS_SUCCESS;
  constructor(public payload: IUser[]) {}
}

/* Добавить пользователя */
export class ActionAddUser implements Action {
  public readonly type = TypeUserActions.ADD_USER;
  constructor(public payload: IUser) {}
}

/* Выбрать пользователя */
export class ActionSelectUser implements Action {
  public readonly type = TypeUserActions.SELECT_USER;
  constructor(public payload: IUser) {}
}

/* Обновить пользователя */
export class ActionUpdateUser implements Action {
  public readonly type = TypeUserActions.UPDATE_USER;
  constructor(public payload: IUser) {}
}

/* Обновить пользователей */
export class ActionUpdateUsers implements Action {
  public readonly type = TypeUserActions.UPDATE_USERS;
  constructor(public payload: IUser[]) {}
}

/* Удалить одного пользователя */
export class ActionDeleteUser implements Action {
  public readonly type = TypeUserActions.DELETE_USER;
  constructor(public payload: IUser) {}
}

/* Удалить всех пользователей */
export class ActionDeleteUsers implements Action {
  public readonly type = TypeUserActions.DELETE_USERS;
}


export type Action = ActionGetUsers
  | ActionAddUser
  | ActionSelectUser
  | ActionLoadUsers
  | ActionUpdateUser
  | ActionUpdateUsers
  | ActionDeleteUser
  | ActionDeleteUsers;
