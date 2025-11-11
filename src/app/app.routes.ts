import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { BarManager } from './pages/bar-manager/bar-manager';
import { Menu } from './pages/menu/menu';
import { Header } from './layauot/header/header';
import { LoggedHeader } from './layauot/logged-header/logged-header';

export const routes: Routes = [
    {
        path: "",
        component: Header,
        children: [{
            path: "",
            component: Home,
        },
        {
            path: "menu/:id",
            component: Menu,
        }]
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
        path: ":id",
        component: LoggedHeader,
        children: [{
            path: "",
            component: Home,
        },
        {
            path: "bar-manager",
            component: BarManager,
        },
        ]
    },
];
