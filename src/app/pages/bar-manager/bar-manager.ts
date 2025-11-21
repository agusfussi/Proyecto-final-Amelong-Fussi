import { Component, inject, input, signal } from '@angular/core';
import { CategoryListManager } from "../../components/category-list-manager/category-list-manager";
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { FormsModule, NgForm } from '@angular/forms';
import { NewCategoryType } from '../../interfaces/categories-types';

@Component({
  selector: 'app-bar-manager',
  imports: [CategoryListManager, FormsModule],
  templateUrl: './bar-manager.html',
  styleUrl: './bar-manager.scss',
})
export class BarManager {
  auth = inject(AuthService)
  categoryService = inject(CategoryService)
  productService = inject(ProductService)
  id = this.auth.getUserId()
  async ngOnInit(): Promise<void> {
    if (this.id != undefined) {
      this.categoryService.getCategoriesByUserId(this.id)
    }
  }
  async createCategory(form: any){
    const categoryData: NewCategoryType = {
      name: form.name
    }
    await this.categoryService.createCategory(categoryData);
  }
}
