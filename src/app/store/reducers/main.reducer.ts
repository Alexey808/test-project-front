import {ActionReducerMap} from '@ngrx/store';
import * as userReducer from './users.reducers';

export const reducers: ActionReducerMap<any> = { // todo type
  userEntity: userReducer.userReducers
};
