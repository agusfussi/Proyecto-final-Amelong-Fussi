import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/users-service';
import { UserType } from '../../interfaces/user-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logged-header',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './logged-header.html',
  styleUrls: ['./logged-header.scss'],
})
export class LoggedHeader implements OnInit{
authService = inject(AuthService);
usersService = inject(UsersService)
userName = signal<string|undefined>(undefined)

async ngOnInit(): Promise<void> {
  const user: UserType | undefined = await this.usersService.getUserById(this.authService.id);
  if (user && user.firstName && user.lastName) {
    this.userName.set(`${user.firstName} ${user.lastName}`);
  }
   if (typeof window !== 'undefined' && window.localStorage)  {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
    
  }

  toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    localStorage.setItem(
      'theme',
      body.classList.contains('dark-theme') ? 'dark' : 'light'
    );
  }

  openDeleteModal() {
    Swal.fire({
      title: "¿Deseas deslogearte?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: "Aceptar",
    }).then((result) => {
      if (result.isDenied) {
        this.logout().then(() =>
        {Swal.fire("Deslogeado con exito");});
      }
    });
  }

async logout() {
   this.authService.logout();
  }
}
