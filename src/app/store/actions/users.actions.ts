class ActionType {
  public readonly type = `user/${this.constructor.name}`;
  constructor(public payload) {}
}


/* Загрузить пользователей*/
export class ActionLoadUsers extends ActionType {}

/* Получить пользователей из стора */
export class ActionGetUsers extends ActionType {}

/* Добавить пользователя */
export class ActionAddUser extends ActionType {}

/* Выбрать пользователя */
export class ActionSelectUser extends ActionType {}

/* Обновить пользователя */
export class ActionUpdateUser extends ActionType {}

/* Обновить пользователей */
export class ActionUpdateUsers extends ActionType {}

/* Удалить одного пользователя */
export class ActionDeleteUser extends ActionType {}

/* Удалить всех пользователей */
export class ActionDeleteUsers extends ActionType {}


export type Action = ActionGetUsers
  | ActionAddUser
  | ActionSelectUser
  | ActionLoadUsers
  | ActionUpdateUser
  | ActionUpdateUsers
  | ActionDeleteUser
  | ActionDeleteUsers;
