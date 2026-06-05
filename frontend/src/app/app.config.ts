import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideKeycloak, includeBearerTokenInterceptor, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG } from 'keycloak-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: 'http://localhost:8081',
        realm: 'ILV',
        clientId: 'demoapp'
      },
      initOptions: {
        onLoad: 'login-required'
      }
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [{ urlPattern: /^(http:\/\/localhost:9090)(\/.*)?$/ }]
    },
    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor])
    )
  ]
};