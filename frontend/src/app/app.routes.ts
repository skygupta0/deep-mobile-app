import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { App } from './app';
import { Home } from './components/home/home';
import { Booking } from './components/booking/booking';
import { Appointment } from './components/appointment/appointment';


export const routes: Routes = [
  { path: 'login', component: Login},
  {path:'booking', component: Booking},
  {path:'appointments', component: Appointment},
  {path: 'register', component: Register},
  {path:'**', redirectTo:''},
  {path:'',component:Home},
  {path:'home', redirectTo:''},
];
