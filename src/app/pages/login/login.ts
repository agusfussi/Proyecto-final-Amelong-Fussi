import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;

  async login(form:any){
    console.log(form.value)
    this.errorLogin = false;
    if(!form.value.userName || !form.value.password){
      this.errorLogin = true;
      return
    }
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
    this.errorLogin = true;
  }
}
