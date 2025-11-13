import { Component, inject, input } from '@angular/core';
import { CategoriesType } from '../../interfaces/categories-types';
import { ProductService } from '../../services/product-service';
import { ProductsListItems } from '../products-list-items/products-list-items';
import { AuthService } from '../../services/auth-service';
import { Menu } from '../../pages/menu/menu';

@Component({
  selector: 'app-category-list-item',
  imports: [ProductsListItems],
  templateUrl: './category-list-item.html',
  styleUrl: './category-list-item.scss',
})
export class CategoryListItem {
  menuService = inject(Menu)
  authService = inject(AuthService)
  category = input.required<CategoriesType>();
  productService = inject(ProductService)
  async ngOnInit(): Promise<void> {
    this.productService.getProductsByUserId(this.menuService.id())
  }
}
