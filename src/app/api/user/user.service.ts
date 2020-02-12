import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from './user.interface';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
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


  getUsers(): Promise<IUser[]> {
    return this.http.get<IUser[]>(this.url).pipe(
      distinctUntilChanged(), // если новые значения отличаются от предыдущих
      filter(Boolean), // убираем пустые элементы
      debounceTime(300), // выжидаем время, выполняя поледний запрос
      // switchMap((res: Response) => res.json()),
      catchError(handleError('getUser', []))
    ).toPromise().then((res: Response) => res.json());
  }

  getUser(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<IUser>(url, this.httpOptions).pipe(
      catchError(handleError('getUser', id))
    );
  }

  addUser({name}: IUser): Observable<any> {
    return this.http.post<IUser[]>(this.url, {name}, this.httpOptions).pipe(
      catchError(handleError<any>('addUser', {name}))
    );
  }

  updateUsers(users: IUser[]) {
    const url = `${this.url}`;
    return this.http.put<IUser[]>(url, users, this.httpOptions).pipe(
      catchError(handleError<IUser[]>('updateUser', users))
    );
  }

  deleteUser(id: string): Observable<any> { // todo type
    const url = `${this.url}?id=${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      catchError(handleError<string>('addUser', id))
    );
  }

  deleteAllUsers(): Observable<any> { // todo type
    return this.http.delete(this.url, this.httpOptions).pipe(
      catchError(handleError<string>('deleteAllUsers'))
    );
  }
}
