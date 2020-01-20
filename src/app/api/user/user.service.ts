import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from './user.interface';
import {catchError, tap} from 'rxjs/operators';
import {handleError} from '../helper/handle-error';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url = '/api/users';
  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url).pipe(
      catchError(handleError('getUser', []))
    );
  }

  async getUser(option): Promise<Observable<any>> {
    return this.http.get(this.url, option);
  }

  addUser(user: IUser): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('---> ', this.url, user);
    return this.http.post<IUser>(this.url, user, httpOptions).pipe(
      catchError(handleError<IUser>('addUser'))
    );
  }

  deleteUser(option) {
    return this.http.delete(this.url, option);
  }

  updateUser(options) {
    return this.http.put(this.url, options);
  }
}
