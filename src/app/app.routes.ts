import { Routes } from '@angular/router';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ProductTableComponent },
  { path: 'crear', component: FormProductComponent },
  { path: 'editar/:id', component: FormProductComponent },
  { path: '**', redirectTo: 'lista' },
];
