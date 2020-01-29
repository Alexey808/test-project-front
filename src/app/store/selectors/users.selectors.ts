import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as userReducer from '../reducers/users.reducers';
import { IState } from '../reducers';

export const getUserState = createFeatureSelector<IState>('userEntity');
export const getSelectedUserState = createFeatureSelector<IState>('selectedUser');

export const sGetAllUsers = createSelector(
  getUserState,
  userReducer.getUsers
);

export const sGetSelectedUser = createSelector(
  getSelectedUserState,
  userReducer.getSelectedUsers
);
