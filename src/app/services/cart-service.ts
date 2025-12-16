import { Injectable, signal } from '@angular/core';
import { ProductType } from '../interfaces/products-types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductType[] = []

  constructor() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.items = JSON.parse(guardado)
    }
  }

  agregar(producto: ProductType) {
    this.items.push(producto)
    this.guardar();
  }

  eliminar(producto: ProductType) {
    this.items = this.items.filter(prod => prod != producto)
    this.guardar()
  }
 
  limpiar() {
    this.items = []
    this.guardar();
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.items))
  }

}
