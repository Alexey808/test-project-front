import * as userAction from '../actions/users.actions';
import { initialState, IState } from './index';

export const getUsers = (state: IState) => state.users;
export const getSelectedUsers = (state: IState) => state.selectedUser;

export function userReducers(state: IState = initialState, action: userAction.Action) {
  switch (action.type) {

    case userAction.TypeUserActions.ADD_USER: {
      const newUser = action.payload;
      return {
        ...state,
        users: [...state.users, newUser]
      };
    }

    case userAction.TypeUserActions.SELECT_USER: {
      const selectedUser = action.payload;
      return {
        ...state,
        selectedUser
      };
    }

    default:
      return state;
  }
}
