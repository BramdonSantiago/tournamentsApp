import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Spanish } from 'flatpickr/dist/l10n/es';

import { routes } from './app.routes';

import { provideFlatpickrDefaults } from 'angularx-flatpickr';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideFlatpickrDefaults({locale: Spanish}), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
