import { Component, inject, input, signal, viewChild, ɵsetUnknownPropertyStrictMode } from '@angular/core';
import { CategoryListManager } from "../../components/category-list-manager/category-list-manager";
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { FormsModule, NgForm } from '@angular/forms';
import { NewCategoryType } from '../../interfaces/categories-types';
import { UsersService } from '../../services/users-service';
import { UserType } from '../../interfaces/user-type';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-manager',
  imports: [CategoryListManager, FormsModule],
  templateUrl: './bar-manager.html',
  styleUrl: './bar-manager.scss',
})
export class BarManager {
  auth = inject(AuthService)
  router = inject(Router)
  categoryService = inject(CategoryService)
  productService = inject(ProductService)
  usersService = inject(UsersService)
  id = this.auth.getUserId()
  editUserForm = viewChild<NgForm>('editUserDataForm')

  async ngOnInit(): Promise<void> {
    if (this.id != undefined) {
      this.categoryService.getCategoriesByUserId(this.id)
      const user = await this.usersService.getUserById(this.id)
    this.editUserForm()?.setValue({
      restaurantName: user.restaurantName,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      password: user.password,
      password2: user.password,
    })
    }
  }

  async createCategory(form: NgForm){
    const categoryData: NewCategoryType = {
      name: form.value.name
    }
    await this.categoryService.createCategory(categoryData);
  }

  async editUser(form: NgForm){
    if (this.id!= undefined){
    const userData: UserType = {
      id: this.id,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      password: form.value.password,
      phoneNumber: form.value.phoneNumber
    }
    await this.usersService.editUser(userData)
  }
  }

  openDeleteModal() {
      Swal.fire({
        title: "¿Querés borrar tu cuenta permanentemente?",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Cancelar",
        denyButtonText: "Borrar",
      }).then((result) => {
        if (result.isDenied && this.id) {
          this.usersService.deleteUser(this.id).then(() =>
          {Swal.fire("Usuario eliminado con éxito");});
        }
      });
    }
}
