import { ApplicationConfig } from '@angular/core';
import { provideKeycloak } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: 'http://localhost:8081',
        realm: 'ILV',
        clientId: 'demoapp'
      },
      initOptions: {
        onLoad: 'login-required'
      }
    })
  ]
};
