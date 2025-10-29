import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { BarManager } from './pages/bar-manager/bar-manager';
import { Menu } from './pages/menu/menu';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
        path: "register",
        component: Register,
    },
    {
        path: "login",
        component: Login,
    },
    {
        path: "bar-manager",
        component: BarManager,
    },
    {
        path: "menus",
        component: Menu,
    },
];
