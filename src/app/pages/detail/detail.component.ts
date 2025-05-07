import { Component } from '@angular/core';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormProductComponent, HeaderComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {}
