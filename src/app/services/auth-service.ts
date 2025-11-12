import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthType } from '../interfaces/auth-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  token : null|string = null;
  id: number | undefined = undefined;
////////////////////////////////////////////
  async login(loginData: AuthType){
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(loginData)
    })
    console.log(res)
    if(res.ok){
      const obj = await res.json();
      this.token = obj.token;
      localStorage.setItem("token",this.token!);
      this.id = this.getUserId()
      this.router.navigate(["/",this.id])
    }
  }
////////////////////////////////////////////
  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
////////////////////////////////////////////
  getUserId() {
    if (!this.token) return;
    return parseInt(this.parseJwt(this.token).sub);
  }
////////////////////////////////////////////
  logout(){
    this.token = null;
    localStorage.removeItem("token")
    this.router.navigate(["/"])
  }
}
