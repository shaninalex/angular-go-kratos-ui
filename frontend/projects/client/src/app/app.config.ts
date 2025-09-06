import {
    ApplicationConfig,
    isDevMode,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {appInit} from './app.init';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {reducers} from '@client/app/app.store';

import * as sessionEffects from "@client/entities/auth/model/session.effects"

export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(appInit),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptorsFromDi()),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideStore(reducers),
        provideEffects(sessionEffects),
        provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()})
    ]
};
