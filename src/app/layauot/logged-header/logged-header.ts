import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-logged-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './logged-header.html',
  styleUrls: ['./logged-header.scss'],
})
export class LoggedHeader {
authService = inject(AuthService);

getuserName(): string | undefined {
  return undefined;
}

logout() {
    this.authService.logout();
  }
}
