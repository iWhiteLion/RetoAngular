import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadProducts(); //Carga inicial
  }

  //Obtener el valor actual de productos
  get productsValue(): Product[] {
    return this.productsSubject.value;
  }

  //Cargar todos los productos de la API
  private loadProducts(): void {
    this.apiService.getAll().subscribe((products: Product[]) => {
      const parsed = products.map(p => this.parseProductDates(p));
      this.productsSubject.next(parsed);
    });
  }

  //Añadir producto a la API
  addProduct(product: Product): void {
    this.apiService.create(product).subscribe((p: Product) => {
      const updated = [...this.productsValue, this.parseProductDates(p)];
      this.productsSubject.next(updated);
    });
  }

//Actualizar producto
  updateProduct(product: Product): void {
    this.apiService.update(product).subscribe((p: Product) => {
      const updated = this.productsValue.map(item =>
        item.id === product.id ? this.parseProductDates(p) : item
      );
      this.productsSubject.next(updated);
    });
  }


/*Eliminar producto
  deleteProduct(id: string): void {
    this.apiService.delete(id).subscribe(() => {
      const updated = this.productsValue.filter(p => p.id !== id);
      this.productsSubject.next(updated);
    });
  } */

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.apiService.getById(id).pipe(
      map((p: Product) => this.parseProductDates(p))
    );
  }

  private parseProductDates(product: Product): Product {
    return {
      ...product,
      fechaLiberacion: new Date(product.fechaLiberacion),
      fechaRevision: new Date(product.fechaRevision)
    };
  }
}
