import { Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ProductComponent },
  { path: 'crear', component: DetailComponent },
  { path: 'editar/:id', component: DetailComponent },
  { path: '**', redirectTo: 'lista' },
];
