import { Component, inject, input, viewChild } from '@angular/core';
import { CategoriesType, NewCategoryType } from '../../interfaces/categories-types';
import { ProductService } from '../../services/product-service';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { ProductsListManager } from "../products-list-manager/products-list-manager";
import Swal from 'sweetalert2'
import { CategoryService } from '../../services/category-service';
import { FormsModule, NgForm } from '@angular/forms';
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
  editCategoryForm = viewChild<NgForm>('editCategoryForm')

  async ngOnInit() {
  if (this.barManager.id) {
    await this.productService.getProductsByUserId(this.barManager.id);
  }

  if (this.category()) {
    this.editCategoryForm()?.setValue({
      name: this.category().name,
    });
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

  async createProduct(form: NgForm){
    const productData: NewProductType = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: this.category().id,
      featured: form.value.featured || false,
      labels: [form.value.labels],
      recommendedFor: form.value.recommendedFor ,
      discount: form.value.discount || 0,
      hasHappyHour: form.value.hasHappyHour || false,
    }
    console.log(productData)
    await this.productService.createProduct(productData);
  }

  async editCategory(form: NgForm){
      const categoryData: CategoriesType = {
        id: this.category().id,
        name: form.value.name
      }
      await this.categoryService.editCategory(categoryData);
    }
}
