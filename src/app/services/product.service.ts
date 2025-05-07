import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([
    // Productos simulados al iniciar
    {
      id: '1',
      nombre: 'Producto Simulado 1',
      descripcion: 'Descripción de producto 1',
      logo: 'https://via.placeholder.com/50',
      fechaLiberacion: new Date(),
      fechaRevision: new Date()
    },
    {
      id: '2',
      nombre: 'Producto Simulado 2',
      descripcion: 'Descripción de producto 2',
      logo: 'https://via.placeholder.com/50',
      fechaLiberacion: new Date(),
      fechaRevision: new Date()
    }
  ]);

  products$ = this._products.asObservable();

  get productsValue(): Product[] {
    return this._products.getValue();
  }

  addProduct(product: Product) {
    const current = this._products.value;
    this._products.next([...current, product]);
  }

  updateProduct(updatedProduct: Product) {
    const updatedProducts = this._products.value.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this._products.next(updatedProducts);
  }

  // Método simulado: buscar producto por id
  getProductById(id: string): Observable<Product | undefined> {
    const found = this.productsValue.find(p => p.id === id);
    return of(found).pipe(delay(500)); // simula 500ms de "espera de servidor"
  }
}
