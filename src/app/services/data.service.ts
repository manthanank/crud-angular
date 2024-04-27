import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { environment } from '../../environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${apiUrl}/users`);
  }

  addUser(user: Users) {
    return this.http.post(`${apiUrl}/users`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${apiUrl}/users/${id}`);
  }

  updateUser(user: Users){
    return this.http.put(`${apiUrl}/users/${user._id}`, user);
  }
}
