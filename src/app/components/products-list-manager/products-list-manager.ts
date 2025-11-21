import { Component, inject, input } from '@angular/core';
import { BarManager } from '../../pages/bar-manager/bar-manager';
import { ProductType } from '../../interfaces/products-types';

@Component({
  selector: 'app-products-list-manager',
  imports: [],
  templateUrl: './products-list-manager.html',
  styleUrl: './products-list-manager.scss',
})
export class ProductsListManager {
  barManagerService = inject(BarManager)
  products = input.required<ProductType>();
}
