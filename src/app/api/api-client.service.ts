import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  public async get<T>(options): Promise<T> {
    try {
      return {
        ...options,
        method: 'get'
      };
    } catch(e) {
      return Promise.reject(e);
    }
  }
}
