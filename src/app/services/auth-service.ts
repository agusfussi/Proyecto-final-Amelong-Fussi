import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthType } from '../interfaces/auth-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  token : null|string = null;

  async login(loginData: AuthType){
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(loginData)
    })
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.router.navigate(["/"])
    } 
    console.log("Respuesta del back ",res);
  }

  logout(){
    this.token = null;
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }
}
