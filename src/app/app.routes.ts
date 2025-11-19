import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { BarManager } from './pages/bar-manager/bar-manager';
import { Menu } from './pages/menu/menu';
import { Header } from './layauot/header/header';
import { LoggedHeader } from './layauot/logged-header/logged-header';
import { onlyLoggedGuardGuard } from './guards/only-logged-guard-guard';
import { publicChildGuardGuard } from './guards/public-child-guard-guard';
import { publicGuardGuard } from './guards/public-guard-guard';

export const routes: Routes = [
    {
        path: "",
        component: Header,
        canActivateChild:[publicChildGuardGuard],
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
        canActivate: [publicGuardGuard],
    },
    {
        path: "login",
        component: Login,
        canActivate: [publicGuardGuard],
    },
    {
        path: ":id",
        component: LoggedHeader,
        canActivateChild: [onlyLoggedGuardGuard],
        children: [{
            path: "",
            component: Home,
        },
        {
            path: "bar-manager",
            component: BarManager,
        },
        {
            path: "menu/:id",
            component: Menu,
        }
        ]
    },
];
