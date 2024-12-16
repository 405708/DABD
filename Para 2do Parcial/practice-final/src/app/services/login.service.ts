import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:User = { email: '', password: '', id: '' };

  logout() {
    this.user = { email: '', password: '', id: '' };
  }
  
  setUserLogin(user:User){
    this.user=user;
  }

  getUserLogin(){
    return this.user;
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users");
  }

  constructor(private http:HttpClient) { }

}
