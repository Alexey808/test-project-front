import { IUser } from '../../api/user/user.interface';

export interface IState {
  users: IUser[];
  selectedUser: IUser | null;
}

export const initialState: IState = {
  users: [],
  selectedUser: null
};

