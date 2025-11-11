import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { UserType } from '../../interfaces/user-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list-cards',
  imports: [RouterLink],
  templateUrl: './restaurant-list-cards.html',
  styleUrl: './restaurant-list-cards.scss',
})
export class RestaurantListCards {
  restaurant = input.required<UserType>();
}
