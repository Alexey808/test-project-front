import {ActionReducer, MetaReducer} from '@ngrx/store';

export function metaReducers(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // tslint:disable-next-line:no-console
    console.info('state => ', state);
    // tslint:disable-next-line:no-console
    console.info('action => ', action);
    return reducer(state, action);
  };
}

export const debugReducer: MetaReducer<any>[] = [metaReducers];
