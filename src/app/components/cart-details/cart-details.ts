import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { UsersService } from '../../services/users-service';
import { UserType } from '../../interfaces/user-type';

@Component({
  selector: 'app-cart-details',
  imports: [],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.scss',
})
export class CartDetails {
  cartService = inject(CartService)
  userService = inject(UsersService)
}