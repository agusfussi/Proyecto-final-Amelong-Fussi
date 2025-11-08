import { inject, Injectable } from '@angular/core';
import { CategoriesType, NewcategorieType } from '../interfaces/categories-types';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  authService = inject(AuthService)
  categories: CategoriesType[] = []

///////////////////////////////////////////////
  async getCategories(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${id}/categories`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: CategoriesType[] = await res.json()
    this.categories = resJson
  }
///////////////////////////////////////////////
  async creatCategorie(productData: NewcategorieType) {
    const res = await fetch('https://w370351.ferozo.com/api/categories',
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
////////////////////////////////////////////
  async deleteContact(id: string | number) {
    const res = await fetch(`https://w370351.ferozo.com/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token,
      },
    });
    if (!res.ok) return false;
    this.categories = this.categories.filter(category => category.id !== id);
    return true;
  }
}
