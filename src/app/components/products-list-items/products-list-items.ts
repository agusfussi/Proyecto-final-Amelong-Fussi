import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductType } from '../../interfaces/products-types';
import { CategoriesType } from '../../interfaces/categories-types';
import { CategoryListItem } from '../category-list-item/category-list-item';
import { CartService } from '../../services/cart-service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-products-list-items',
  imports: [],
  templateUrl: './products-list-items.html',
  styleUrl: './products-list-items.scss',
})
export class ProductsListItems {
  menuService = inject(CategoryListItem);
  authService = inject(AuthService)
  cartService = inject(CartService);
  products = input.required<ProductType>();

  addToCart (product: ProductType) {
    const restaurantName = this.menuService.menuService.restaurantName()
    const item: ProductType = {
      ...product,
      restaurantName: restaurantName
    }
    this.cartService.agregar(item)
    Swal.fire("¡Producto agregado al carrito!");
  }
}
