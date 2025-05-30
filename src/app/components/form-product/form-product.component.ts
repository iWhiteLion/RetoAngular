import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, of, delay } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormProductComponent {
  productForm: FormGroup;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        [this.idNotTakenValidator()]
      ],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', [Validators.required, this.fechaLiberacionValidator]],
      fechaRevision: [{ value: '', disabled: true }, [Validators.required, this.fechaRevisionValidator.bind(this)]]
    });

    this.productForm.get('fechaLiberacion')?.valueChanges.subscribe(() => {
      this.onFechaLiberacionChange();
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editingId = id;
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    const product = this.productService.productsValue.find(p => p.id === id);
    if (product) {
      this.productForm.patchValue(product);
    }
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Muestra los errores campo por campo
      return;
    }

    const productData = this.productForm.getRawValue();

    if (this.editingId) {
      this.productService.updateProduct(productData);
    } else {
      this.productService.addProduct(productData);
    }

    this.productForm.reset();
    this.submitted = false;
  }


  onReset() {
    this.productForm.reset();
    this.submitted = false;
  }


  idNotTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (this.editingId === control.value) {
        return of(null); // permitimos que el mismo id del que edita pase
      }
      return of(this.productService.productsValue.some(p => p.id === control.value)).pipe(
        delay(500), // simulamos delay
        map(exists => (exists ? { idTaken: true } : null))
      );
    };
  }

  fechaLiberacionValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      return { fechaInvalida: true };
    }
    return null;
  }

  fechaRevisionValidator(control: AbstractControl): ValidationErrors | null {
    const liberacionControl = this.productForm?.get('fechaLiberacion');
    if (!liberacionControl) return null;
    const fechaLiberacion = new Date(liberacionControl.value);
    const fechaRevision = new Date(control.value);

    const expectedFechaRevision = new Date(fechaLiberacion);
    expectedFechaRevision.setFullYear(expectedFechaRevision.getFullYear() + 1);

    if (
      fechaRevision.getFullYear() !== expectedFechaRevision.getFullYear() ||
      fechaRevision.getMonth() !== expectedFechaRevision.getMonth() ||
      fechaRevision.getDate() !== expectedFechaRevision.getDate()
    ) {
      return { revisionIncorrecta: true };
    }

    return null;
  }

  onFechaLiberacionChange() {
    const fechaLiberacion = this.productForm.get('fechaLiberacion')?.value;
    if (fechaLiberacion) {
      const fechaLiberacionDate = new Date(fechaLiberacion);
      const fechaRevisionDate = new Date(fechaLiberacionDate.setFullYear(fechaLiberacionDate.getFullYear() + 1));
      this.productForm.get('fechaRevision')?.setValue(fechaRevisionDate.toISOString().split('T')[0]);
    }
  }
}
