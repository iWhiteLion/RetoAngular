import { Component } from '@angular/core';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductTableComponent,HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
