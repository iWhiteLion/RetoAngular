import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Importa la configuración de app.config.ts

// Usa appConfig para inicializar la aplicación con los providers correctos
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
