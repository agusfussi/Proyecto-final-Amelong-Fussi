import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { NewProductType, ProductType } from '../../interfaces/products-types';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryListManager } from '../category-list-manager/category-list-manager';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service';
import { producerAccessed } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-products-list-manager',
  imports: [FormsModule],
  templateUrl: './products-list-manager.html',
  styleUrl: './products-list-manager.scss',
})
export class ProductsListManager implements OnInit {
  productService = inject(ProductService)
  barManagerService = inject(BarManager)
  products = input.required<ProductType>();
  editProductForm = viewChild<NgForm>('editProductForm');

  async ngOnInit() {
    setTimeout(() => this.editProductForm()?.setValue({
      name: this.products().name,
      description: this.products().description,
      price: this.products().price,
      featured: this.products().featured,
      labels: this.products().labels[0],
      recommendedFor: this.products().recommendedFor,
      discount: this.products().discount,
      hasHappyHour: this.products().hasHappyHour,
    }), 0);
  }

  async editProduct(form: NgForm) {
    const originalHappyHour = this.products().hasHappyHour;
    const newHappyHour = form.value.hasHappyHour;
    const productData: ProductType = {
      id: this.products().id,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: this.products().categoryId,
      featured: form.value.featured || false,
      labels: form.value.labels === null ? ['None'] : [form.value.labels],
      recommendedFor: form.value.recommendedFor || 1,
      discount: form.value.discount || 0,
      hasHappyHour: originalHappyHour,
    }
    await this.productService.editProduct(productData);
    if (newHappyHour !== originalHappyHour) {
      await this.productService.setHappyHour(this.products().id);
    }
  }

  async setHappyHour() {
    await this.productService.setHappyHour(this.products().id);
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
        this.productService.deleteProduct(this.products().id).then(() => { Swal.fire("Borrado con exito"); });
      }
    });
  }
}
