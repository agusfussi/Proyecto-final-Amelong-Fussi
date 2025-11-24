import { Component, inject, input } from '@angular/core';
import { CategoriesType, NewCategoryType } from '../../interfaces/categories-types';
import { ProductService } from '../../services/product-service';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { ProductsListManager } from "../products-list-manager/products-list-manager";
import Swal from 'sweetalert2'
import { CategoryService } from '../../services/category-service';
import { FormsModule } from '@angular/forms';
import { NewProductType } from '../../interfaces/products-types';

@Component({
  selector: 'app-category-list-manager',
  imports: [ProductsListManager, FormsModule],
  templateUrl: './category-list-manager.html',
  styleUrl: './category-list-manager.scss',
})
export class CategoryListManager {
  
  barManager = inject(BarManager)
  category = input.required<CategoriesType>();
  productService = inject(ProductService)
  categoryService = inject(CategoryService)
  async ngOnInit(): Promise<void> {
    if (this.barManager.id) {
      this.productService.getProductsByUserId(this.barManager.id)
    }
  }
  openDeleteModal() {
    Swal.fire({
      title: "¿Querés borrar la categoría con todos sus productos?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: "Borrar",
    }).then((result) => {
      if (result.isDenied) {
        this.categoryService.deleteCategory(this.category().id).then(() =>
        {Swal.fire("Borrado con exito");});
      }
    });
  }

  async createProduct(form: any){
    const productData: NewProductType = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: this.category().id,
      featured: form.value.featured || false,
      labels: [],
      recommendedFor: 0 ,
      discount: form.value.discount || 0,
      hasHappyHour: form.value.hasHappyHour || false,
    }
    console.log(productData)
    await this.productService.createProduct(productData);
  }
  async editCategory(form: any){
      const categoryData: CategoriesType = {
        id: this.category().id,
        name: form.value.name
      }
      await this.categoryService.editCategory(categoryData);
    }
}
