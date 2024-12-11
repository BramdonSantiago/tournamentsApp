import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideFlatpickrDefaults } from 'angularx-flatpickr';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideFlatpickrDefaults(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
