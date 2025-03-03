import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PruebaComponent } from './components/prueba/prueba.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'prueba',
    component: PruebaComponent,
    title: 'Prueba de componente',
  },
];
