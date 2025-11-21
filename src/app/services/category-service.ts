import { inject, Injectable } from '@angular/core';
import { CategoriesType, NewCategoryType } from '../interfaces/categories-types';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  authService = inject(AuthService)
  categories: Record<number,CategoriesType[]> = {}

///////////////////////////////////////////////
  async getCategoriesByUserId(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/users/${id}/categories`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: CategoriesType[] = await res.json()
    this.categories[id] = resJson
  }
///////////////////////////////////////////////
  async createCategory(categoryData: NewCategoryType) {
    const res = await fetch('https://w370351.ferozo.com/api/categories',
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData)
      }
    );
    if (res.ok) {
      const resultado = await res.json();
      if (!(this.authService.getUserId()! in this.categories)) {
        this.categories[this.authService.getUserId()!] = [];
      }
      this.categories[this.authService.getUserId()!].push(resultado);
      return resultado;
    } else {
      return false;
    }
  }
////////////////////////////////////////////
  async deleteCategory(id: number) {
    const res = await fetch(`https://w370351.ferozo.com/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token,
      },
    });
    if (!res.ok) return false;
    delete this.categories[this.authService.getUserId()!][id]; 
    return true;
  }
  //////////////////////////////////////
  async editCategory(categoryData: CategoriesType) {
    const res = await fetch(`https://w370351.ferozo.com/api/categories/${categoryData.id}`, {
      method: "PUT",
      headers: { 
        Authorization: "Bearer " + this.authService.token,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(categoryData),
    });
    const resJson: CategoriesType[] = await res.json();
    this.categories[this.authService.getUserId()!] = this.categories[this.authService.getUserId()!].map(category => {
      if (category.id === categoryData.id) {
        return categoryData;
      }
      return category;
    });
    return categoryData
  }
}
