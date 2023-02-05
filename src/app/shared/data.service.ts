import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../users/users.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://backend-yduy.onrender.com/api/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  addUser(user: User) {
    return this.http.post(this.url, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateUser(user: User){
    return this.http.put(`${this.url}/${user._id}`, user);
  }
}
