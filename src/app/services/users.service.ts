import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users, User } from '../models/users';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>(`${apiUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${apiUrl}/users/${id}`);
  }

  addUser(user: Users): Observable<any> {
    return this.http.post(`${apiUrl}/users`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${apiUrl}/users/${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${apiUrl}/users/${user._id}`, user);
  }

}