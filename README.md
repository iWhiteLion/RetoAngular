<<<<<<< HEAD
# Reto_Angular
=======
# Reto Angular

Reto realizado en base al Seniority de Junior "Generar una aplicación frontend para cumplir las funcionalidades: F1, F2, F3, no es mandatorio funcionalidades: F4, F5, F6."
Con un agregado de la funcionalidad F4 con sus respectivas validaciones.

# Funcionalidades

# F1. Listado de productos financieros: 
  Se requiere una aplicación para visualizar los diferentes productos financieros ofertados por la Institución Banco Pichincha cargados de una API. Realizar la maquetación en base al diseño D1.

# F2. búsqueda de productos financieros:
  Se requiere realizar búsqueda de los productos financieros mediante un campo de texto. Realizar la maquetación en base al diseño D1.

# F3. Cantidad de registros:
 Se requiere que se muestre la cantidad de resultados mostrados en el listado y un select que permita seleccionar la cantidad de registros a mostrar debe contener los siguientes valores: 5, 10 y 20. Realizar la maquetación en base al diseño D1.

# F4. Agregar producto:
  Se requiere la implementación un botón de “Agregar” para navegar al formulario de registro, el formulario debe permitir la creación de un producto mediante un botón “Agregar” y debe permitir la limpieza del formulario      mediante un botón de “Reiniciar”. Realizar la maquetación del formulario base al diseño D2 y de la ubicación del botón principal en base a diseño D3

# Estructura del proyecto
```
└─src
  │   index.html
  │   main.ts
  │   styles.css
  │
  └───app
      │   app.component.css
      │   app.component.html
      │   app.component.spec.ts
      │   app.component.ts
      │   app.config.ts
      │   app.routes.ts
      │
      ├───api
      │       api.service.ts
      │
      ├───components
      │   ├───form-product
      │   │       form-product.component.css
      │   │       form-product.component.html        
      │   │       form-product.component.spec.ts     
      │   │       form-product.component.ts
      │   │
      │   ├───header
      │   │       header.component.css
      │   │       header.component.html
      │   │       header.component.spec.ts
      │   │       header.component.ts
      │   │
      │   └───product-table
      │           product-table.component.css        
      │           product-table.component.html       
      │           product-table.component.spec.ts    
      │           product-table.component.ts
      │
      ├───models
      │       product.model.ts
      │
      ├───pages
      └───services
              product.service.spec.ts
              product.service.ts
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


/src/app/
  ├── components/
  │     ├── atoms/
  │     │    ├── input-text/
  │     │    │    └── input-text.component.ts/html/css
  │     │    ├── button/
  │     │    │    └── button.component.ts/html/css
  │     ├── molecules/
  │     │    ├── form-product/
  │     │    │    └── form-product.component.ts/html/css
  │     ├── organisms/
  │     │    ├── product-table/
  │     │    │    └── product-table.component.ts/html/css
  ├── models/
  │     └── product.model.ts
  ├── services/
  │     └── product.service.ts
  ├── app.component.ts
  └── app.module.ts
>>>>>>> d2293c1 (Primer commit)
