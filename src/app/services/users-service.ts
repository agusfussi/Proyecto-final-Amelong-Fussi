import { inject, Injectable } from '@angular/core';
import { NewUserType, UserType } from '../interfaces/user-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authService = inject(AuthService);
  restaurants: UserType[] | undefined = undefined
//////////////////////////// Register
  async register(registerData: NewUserType){
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(registerData)
    });
  }
////////////////////////// Obtener usuarios por id
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
  /////////////////////// ibtener restaurentes(usuarios)
    async getUsers () {
    const res = await fetch(`https://w370351.ferozo.com/api/users`, {
      headers: {
        Authorization: "Bearer " + this.authService.token,
      }
    });
    const users = await res.json()
    this.restaurants = users
    return users
  }
}
