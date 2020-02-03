import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as userReducer from '../reducers/users.reducers';
import { IState } from '../reducers';

export const getUserState = createFeatureSelector<IState>('userEntity');
// export const getSelectUserState = createFeatureSelector<IState>('selectUser');

export const sGetAllUsers = createSelector(
  getUserState,
  userReducer.getUsers
);

export const sGetSelectUser = createSelector(
  getUserState,
  userReducer.getSelectUsers
);
