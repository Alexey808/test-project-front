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
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url).pipe(
      catchError(handleError('getUser', []))
    );
  }

  getUser(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    console.log('-----------> ', url, 'id ->>>> ', id);
    return this.http.get<IUser>(url, this.httpOptions).pipe(
      catchError(handleError('getUser', id))
    );
  }

  addUser(user: Omit<IUser, 'id'>): Observable<Omit<IUser, 'id'>> { // todo привести типы в нормальный вид
    return this.http.post<Omit<IUser, 'id'>>(this.url, user, this.httpOptions).pipe(
      catchError(handleError<Omit<IUser, 'id'>>('addUser', user))
    );
  }

  deleteUser(id: string): Observable<any> { // todo type
    const url = `${this.url}?id=${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      catchError(handleError<string>('addUser', id))
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    const url = `${this.url}/${user.id}`;

    return this.http.put<IUser>(url, user, this.httpOptions).pipe(
      catchError(handleError<IUser>('updateUser', user))
    );
  }
}
