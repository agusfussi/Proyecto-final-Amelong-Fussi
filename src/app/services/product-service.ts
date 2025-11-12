import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { NewProductType, ProductType, setDiscountType } from '../interfaces/products-types';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  authService = inject(AuthService)
  productos: Record<number,ProductType[]> = {};

  async getProductsByUserId(userId: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${userId}/products`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
    const resJson: ProductType[] = await res.json();
    this.productos[userId] = resJson;
    return resJson;
  }
////////////////////////////////////////////
  async getProductsLoggedRestaurant(){
    const res = await fetch('https://w370351.ferozo.com/api/products/me',
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      });
    const resJson: ProductType[] = await res.json();
    this.productos[this.authService.getUserId()!] = resJson
    return resJson
  }
////////////////////////////////////////////
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
////////////////////////////////////////////
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
      if (!(this.authService.getUserId()! in this.productos)) {
        this.productos[this.authService.getUserId()!] = [];
      }
      this.productos[this.authService.getUserId()!].push(resultado);
      return resultado;
    } else {
      return false;
    }
  }
////////////////////////////////////////////
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
      this.productos[this.authService.getUserId()!] = this.productos[this.authService.getUserId()!].map(product => {
        if (product.id === productData.id) {
          return productData;
        }
        return product;
      });
      return productData;
  }
////////////////////////////////////////////
  async deleteProduct(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token,
      },
    });
    if (!res.ok) return false;
    delete this.productos[this.authService.getUserId()!][id]; 
    return true;
  }
////////////////////////////////////////////
  async setHappyHour(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/products/${id}/happyHour`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) {return false}
    else {this.productos[this.authService.getUserId()!] = this.productos[this.authService.getUserId()!].map(product => {
      if(product.id === id) {
        return {...product, hasHappyHour: !product.hasHappyHour};
      };
      return product;
    })
    return true;
    }
  }
////////////////////////////////////////////
  async setDiscount(id: number, discountData: setDiscountType) {
    const res = await fetch(`https://w370351.ferozo.com/api/products/${id}/discount`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(discountData)
      });
    if (!res.ok) {return false}
    else {this.productos[this.authService.getUserId()!] = this.productos[this.authService.getUserId()!].map(product => {
      if(product.id === id) {
        return {...product, discount: discountData.discount};
      };
      return product;
    })
    return true;
    }
  }
}
