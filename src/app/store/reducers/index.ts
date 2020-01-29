import { IUser } from '../../api/user/user.interface';

export interface IState {
  users: IUser[];
  selectedUser: IUser | null;
}

export const initialState: IState = {
  users: [{id: '0', name: 'test-0'}, {id: '1', name: 'test-1'}, {id: '2', name: 'test-2'}],
  selectedUser: null
};

