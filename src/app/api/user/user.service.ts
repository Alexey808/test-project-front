import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url = '/api/users';
  constructor(
    private http: HttpClient
  ) {}

  async getUsers(): Promise<Observable<any>> {
    return this.http.get(this.url);
  }

  async getUser(option): Promise<Observable<any>> {
    console.log('option -> ', option);
    return this.http.get(this.url, option);
  }

  // createUser(options) {}
  // deleteUser(option) {}
  // updateUser(options) {}
}
