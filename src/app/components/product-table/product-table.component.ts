import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
})
export class ProductTableComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products$: Observable<Product[]> = this.productService.products$;

  allProducts: Product[] = []; //Lista original 
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];

  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  flag: boolean = true;

  //Agregar producto
  goToAdd() {
    this.router.navigate(['/crear']);
  }

  //Edición del producto
  goToEdit(id: string) {
    this.router.navigate(['/editar', id]);
  }

  ngOnInit(): void {
    this.products$.subscribe(products => {
      this.allProducts = products; //Guardar todos los productos
      this.filteredProducts = products;
      this.paginateProducts();
    });
  }

  //Filtrar productos
  filterProducts(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.filteredProducts = this.allProducts; 
    } else {
      this.filteredProducts = this.allProducts.filter((product: Product) =>
        product.nombre.toLowerCase().includes(term) ||
        product.descripcion.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term)
      );
    }

    this.paginateProducts(); 
  }

  //Pagina los productos según la cantidad de registros por página
  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  //Cambia la cantidad de productos mostrados por página
  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.paginateProducts();
  }

  //Cambiar la página actual
  changePage(page: number): void {
    this.currentPage = page;
    this.paginateProducts();
  }

  //Manejar el cambio de término de búsqueda
  onSearchTermChange(): void {
    this.currentPage = 1;
    this.filterProducts(); 
  }

  //N total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
}
