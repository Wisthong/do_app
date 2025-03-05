import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './interceptor/spinner.interceptor';

import { provideToastr } from 'ngx-toastr';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

// Importar los datos de localización de español
import localeEs from '@angular/common/locales/es';
// Registrar el locale
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), // required animations providers
    provideToastr({
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      progressAnimation: 'increasing',
      disableTimeOut: false,
      easing: 'ease-out',
    }),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
  ],
};
