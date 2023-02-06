import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exampleone } from 'src/app/models/exampleone.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleoneService {
  
  url = 'https://backend-yduy.onrender.com/api/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  addUser(user: Exampleone) {
    return this.http.post(this.url, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateUser(user: Exampleone){
    return this.http.put(`${this.url}/${user._id}`, user);
  }
}
