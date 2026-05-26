import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Allrecipes } from './pages/allrecipes/allrecipes';
import { Viewrecipe } from './pages/viewrecipe/viewrecipe';
import { Userprofile } from './pages/userprofile/userprofile';

export const routes: Routes = [
    {
        path:'admin' , loadChildren:()=>import('./admin/admin-module').then(m=>m.AdminModule)
    },
    {
        path:'',component:LandingPage
    },
    {
        path:'login',component:Login
    },
    {
        path:'register',component:Register
    },
    {
        path:'allrecipes',component:Allrecipes
    },
    {
        path:'viewrecipe/:id',component:Viewrecipe
    },
    {
        path:'userprofile',component:Userprofile
    }
];
