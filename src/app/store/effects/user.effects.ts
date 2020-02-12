import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { UsersService } from '../../components/users/users.service';
import { UserApiService } from '../../api/user/user.service';
import { IUser } from '../../api/user/user.interface';
import { Store } from '@ngrx/store';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    public userApiService: UserApiService,
    private store: Store<{ users: IUser[] }>,
  ) {}

  // myEffect = createEffect(() => { } );
}



