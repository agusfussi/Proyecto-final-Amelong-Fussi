import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductType } from '../../interfaces/products-types';
import { CategoriesType } from '../../interfaces/categories-types';
import { CategoryListItem } from '../category-list-item/category-list-item';

@Component({
  selector: 'app-products-list-items',
  imports: [],
  templateUrl: './products-list-items.html',
  styleUrl: './products-list-items.scss',
})
export class ProductsListItems {
  menuService = inject(CategoryListItem)
  products = input.required<ProductType>();
}
