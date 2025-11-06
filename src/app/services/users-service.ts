import { inject, Injectable } from '@angular/core';
import { NewUserType } from '../interfaces/user-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authService = inject(AuthService);

  async register(registerData: NewUserType){
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(registerData)
    });
  }

  async getUserById (id: number | undefined) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${id}`, {
      headers: {
        Authorization: "Bearer " + this.authService.token,
      }
    });
    const user = await res.json()
    return user
  }
  //consultar el tema de tipo de dato undefinied del id (lo hice para que me deje llamar a la funcion en logged header)
}
