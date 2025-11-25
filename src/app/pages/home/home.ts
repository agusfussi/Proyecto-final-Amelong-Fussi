import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UsersService } from '../../services/users-service';
import { RestaurantListCards } from "../../components/restaurant-list-cards/restaurant-list-cards";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RestaurantListCards, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  ngOnInit(): void {
    this.userService.getUsers();
  }
  userService = inject(UsersService)
}
