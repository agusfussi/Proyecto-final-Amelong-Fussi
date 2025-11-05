import { Injectable } from '@angular/core';
import { NewUserType } from '../interfaces/user-type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  async register(registerData: NewUserType){
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(registerData)
    });
  }
}
