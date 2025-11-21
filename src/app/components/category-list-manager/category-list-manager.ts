import { Component, inject, input } from '@angular/core';
import { Menu } from '../../pages/menu/menu';
import { AuthService } from '../../services/auth-service';
import { CategoriesType } from '../../interfaces/categories-types';
import { ProductService } from '../../services/product-service';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { ProductsListManager } from "../products-list-manager/products-list-manager";

@Component({
  selector: 'app-category-list-manager',
  imports: [ProductsListManager],
  templateUrl: './category-list-manager.html',
  styleUrl: './category-list-manager.scss',
})
export class CategoryListManager {
  barManager = inject(BarManager)
  category = input.required<CategoriesType>();
  productService = inject(ProductService)
  async ngOnInit(): Promise<void> {
    if (this.barManager.id) {
    this.productService.getProductsByUserId(this.barManager.id)
    }
  }
}
