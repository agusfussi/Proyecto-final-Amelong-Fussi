import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { UserType } from '../../interfaces/user-type';
import { CategoryListItem } from '../../components/category-list-item/category-list-item';

@Component({
  selector: 'app-menu',
  imports: [CategoryListItem],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  id = input.required<number>();
  usersService = inject(UsersService)
  categoryService = inject(CategoryService)
  productService = inject(ProductService)
  restaurantName = signal<string | undefined>(undefined)

  async ngOnInit(): Promise<void> {
    const restaurant: UserType = await this.usersService.getUserById(this.id())
    if (restaurant) {
      this.restaurantName.set(`${restaurant.restaurantName}`)
    }
    this.categoryService.getCategoriesByUserId(this.id())
  }
}
