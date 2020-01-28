import * as userAction from '../actions/users.actions';
import { EnumUserActions } from '../actions/users.actions';
import { initialState, IState } from './index';

export function reducers(state: IState = initialState, action: userAction.Action) {
  switch (action.type) {

    case EnumUserActions.ADD_USER: {
      const newUser = action.payload;
      return {
        ...state,
        users: [...state.users, newUser]
      };
    }

    default:
      return state;
  }
}

export const getUsers = (state: IState) => state.users;



