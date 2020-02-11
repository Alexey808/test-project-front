import { IUser } from '../../api/user/user.interface';

export interface IState {
  users: IUser[];
  selectUser: IUser | null;
}

export const initialState: IState = {
  users: [],
  selectUser: {id:'tra-ta-ta', name:'testttt!'}
};

