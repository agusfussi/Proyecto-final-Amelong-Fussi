import { Component, inject, input } from '@angular/core';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { ProductType } from '../../interfaces/products-types';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryListManager } from '../category-list-manager/category-list-manager';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list-manager',
  imports: [FormsModule],
  templateUrl: './products-list-manager.html',
  styleUrl: './products-list-manager.scss',
})
export class ProductsListManager {
  productService = inject(ProductService)
  barManagerService = inject(BarManager)
  products = input.required<ProductType>();


  async editProduct(form: any) {
    const productData: ProductType = {
      id: this.products().id,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: this.products().categoryId,
      featured: form.value.featured || false,
      labels: [],
      recommendedFor: 0,
      discount: form.value.discount || 0,
      hasHappyHour: form.value.hasHappyHour || false,
    }
    await this.productService.editProduct(productData);
  }

  openDeleteModal() {
      Swal.fire({
        title: "¿Querés borrar el producto?",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Cancelar",
        denyButtonText: "Borrar",
      }).then((result) => {
        if (result.isDenied) {
          this.productService.deleteProduct(this.products().id).then(() =>
          {Swal.fire("Borrado con exito");});
        }
      });
    }
}
