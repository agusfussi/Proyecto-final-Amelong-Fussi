import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { NewProduct, ProductType } from '../interfaces/products-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authService = inject(AuthService)
  productos: any;
  ////////////////////////////////
  async creatProduct(productData: NewProduct) {
    const nuevoProducto: ProductType = {
      ...productData,
    };
    const res = await fetch('https://w370351.ferozo.com/api/products',
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      }
    );
    if (res.ok) {
      const resultado = await res.json();
      return resultado;
    } else {
      return false;
    }
  }
  //////////////////////////////////
    async editProduct(productData: ProductType) {

    const res = await fetch(`https://w370351.ferozo.com/api/products/${productData.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(productData)
      }
    );
    if (!res.ok) return null;
    if (res.status === 204) {
      this.productos = this.productos.map((c: { id: any; }) =>
        c.id === productData.id ? productData : c
      );
      return productData;
    }
    const resultado: ProductType = await res.json();
    this.productos = this.productos.map((c: { id: any; }) =>
      c.id === resultado.id ? resultado : c
    );
    return resultado
  }
    ////////////////////////////////////////////////////////////////////////////
  async setHappyHour(id: string | number) {
    const res = await fetch(`https://w370351.ferozo.com/api/products` + "/" + id + "/happyHour",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return;
    this.productos = this.productos.map((product: { id: string | number; isFavorite: any; }) => {
      if (product.id === id) return {
        ...product, isFavorite: !product.isFavorite
      };
      return product
    });
    return true
  }
}

