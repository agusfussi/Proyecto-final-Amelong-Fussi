import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { UsersService } from '../../services/users-service';
import { UserType } from '../../interfaces/user-type';
import { compileOpaqueAsyncClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-cart-details',
  imports: [],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.scss',
})
export class CartDetails {
  cartService = inject(CartService)
  userService = inject(UsersService)

  total(){
    let total = 0
    for (const item of this.cartService.items) {
      if (item.discount > 0) {
        total = total + item.price - (item.price * item.discount / 100)
      } else {
        total = total + item.price
      }
    }
    return total
  }
}