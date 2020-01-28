import * as userReducer from '../reducers/users.reducers';
import { IUser } from '../../api/user/user.interface';
import { createFeatureSelector, createSelector} from '@ngrx/store';

/* STATE */

export interface IState {
  users: IUser[];
}

export const initialState: IState = {
  users: [{id: '0', name: 'test-0'}, {id: '1', name: 'test-1'}, {id: '2', name: 'test-2'}]
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
