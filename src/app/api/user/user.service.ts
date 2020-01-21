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
  private readonly url = '/api/users';
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

  addUser(user: Omit<IUser, 'id'>): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.url, user, httpOptions).pipe( // todo разобраться с типом any
      catchError(handleError<Omit<IUser, 'id'>>('addUser', user))
    );
  }

  deleteUser(id: string) {
    const url = `${this.url}/${id}`;

    return this.http.delete(url, {}).pipe(
      catchError(handleError<string>('addUser', id))
    );
  }

  updateUser(options) {
    return this.http.put(this.url, options);
  }
}
