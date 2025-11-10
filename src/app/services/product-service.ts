import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { NewProductType, ProductType } from '../interfaces/products-types';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  authService = inject(AuthService)
  productos: ProductType[] = [];

  async getProductsByUserId(userId: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${userId}/products`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
    const resJson: ProductType[] = await res.json();
    return resJson;
    //this.productos = resJson;
  }

  async getProductsLoggedRestaurant(){
    const res = await fetch('https://w370351.ferozo.com/api/products/me',
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
    const resJson: ProductType[] = await res.json();
    return resJson
  }

  async getProductById(productId: number){
    const res = await fetch(`https://w370351.ferozo.com/api/products/${productId}`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
    const resJson: ProductType = await res.json();
    return resJson
  }

  async createProduct(productData: NewProductType) {
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
    if (!res.ok) {return false}
      this.productos = this.productos.map(product => {
        if (product.id === productData.id) {
          return productData;
        }
        return product;
      });
      return productData;
  }

  async setHappyHour(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/products/${id}/happyHour`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) {return false}
    else {this.productos = this.productos.map(product => {
      if(product.id === id) {
        return {...product, hasHappyHour: !product.hasHappyHour};
      };
      return product;
    })
    return true;
    }
  }
}
