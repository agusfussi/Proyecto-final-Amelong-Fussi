import { isPlatformBrowser } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { CartDetails } from "../../components/cart-details/cart-details";

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, CartDetails],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartService = inject(CartService)
}
