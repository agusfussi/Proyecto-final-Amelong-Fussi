import { Component, inject, input } from '@angular/core';
import { Menu } from '../../pages/menu/menu';
import { AuthService } from '../../services/auth-service';
import { CategoriesType } from '../../interfaces/categories-types';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-category-list-manager',
  imports: [],
  templateUrl: './category-list-manager.html',
  styleUrl: './category-list-manager.scss',
})
export class CategoryListManager {
 menuService = inject(Menu)
  authService = inject(AuthService)
  category = input.required<CategoriesType>();
  productService = inject(ProductService)
  async ngOnInit(): Promise<void> {
    this.productService.getProductsByUserId(this.menuService.id())
  }
}
