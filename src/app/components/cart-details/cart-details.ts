import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-details',
  imports: [],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.scss',
})
export class CartDetails {
  cartService = inject(CartService)
}
