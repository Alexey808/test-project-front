import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url = '/api/users';
  constructor(
    private http: HttpClient
  ) {}

  async getUsers() {
    const result = this.http.get(this.url);
    console.log('api -> user.service -> get ->', result);
    return result;
  }

  // getUser(option) {}
  // createUser(options) {}
  // deleteUser(option) {}
  // updateUser(options) {}
}
