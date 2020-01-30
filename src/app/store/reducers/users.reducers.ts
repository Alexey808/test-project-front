import * as userAction from '../actions/users.actions';
import { initialState, IState } from './index';

export const getUsers = (state: IState) => state.users;
export const getSelectedUsers = (state: IState) => state.selectedUser;

export function userReducers(state: IState = initialState, action: userAction.Action) {
  switch (action.type) {

    case userAction.TypeUserActions.GET_USERS: {
      console.log('надо избавится от лишнего редьюса');
      return {
        ...state,
      };
    }
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

    case userAction.TypeUserActions.LOAD_USERS: {
      console.log('надо избавится от лишнего редьюса');
      const users = action.payload;
      return {
        ...state,
        users
      };
    }

    default:
      return state;
  }
}
