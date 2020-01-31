import * as userAction from '../actions/users.actions';
import { initialState, IState } from './index';

export const getUsers = (state: IState) => state.users;
export const getSelectedUsers = (state: IState) => state.selectedUser;

export function userReducers(state: IState = initialState, action: userAction.Action) {
  switch (action.type) {

    case userAction.TypeUserActions.LOAD_USERS: {
      return {
        ...state,
      };
    }

    case userAction.TypeUserActions.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      return {
        ...state,
        users
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

    case userAction.TypeUserActions.UPDATE_USER: {
      const updateDataUser = action.payload;
      const users = state.users.map((user) => {
        if (user.id === updateDataUser.id) { user = updateDataUser; }
        return user;
      });

      return {
        ...state,
        users
      };
    }

    case userAction.TypeUserActions.DELETE_USER: {
      const deleteUser = action.payload;
      const users = state.users.filter((user) => user.id !== deleteUser.id);

      return {
        ...state,
        users
      };
    }

    case userAction.TypeUserActions.DELETE_USERS: {
      return {
        ...state,
        users: []
      };
    }


    default:
      return state;
  }
}
