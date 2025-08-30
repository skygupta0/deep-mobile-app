import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { App } from './app';
import { Home } from './components/home/home';


export const routes: Routes = [
  { path: 'login', component: Login},
  {path: 'register', component: Register},
  {path:'**', redirectTo:''},
  {path:'',component:Home},
  {path:'home', redirectTo:''}
];
