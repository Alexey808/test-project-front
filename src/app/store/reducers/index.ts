import * as userReducer from '../reducers/users.reducers';
import { IUser } from '../../api/user/user.interface';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

/* STATE */

export interface IState {
  users: IUser[];
  selectedUser: IUser | null;
}

export const initialState: IState = {
  users: [{id: '0', name: 'test-0'}, {id: '1', name: 'test-1'}, {id: '2', name: 'test-2'}],
  selectedUser: null
};

export const reducers = { // todo type : ActionReducerMap<IState>
  users: userReducer.reducers
};


/* SELECTORS */

export const getUserState = createFeatureSelector<IState>('users');
export const getAllUsers = createSelector(
  getUserState,
  userReducer.getUsers
);


export const getSelectedUserState = createFeatureSelector<IState>('selectedUser');
export const getSelectedUser = createSelector(
  getSelectedUserState,
  userReducer.getSelectedUsers
);
