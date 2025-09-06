import {map, Observable, of} from 'rxjs';
import {Session} from '@ory/kratos-client';
import {catchError} from 'rxjs/operators';
import {inject} from '@angular/core';
import {AuthService, SetSessionAction} from '@client/entities/auth';
import {Store} from '@ngrx/store';
import {AppState} from '@client/shared/common';
import {Router} from '@angular/router';

export function appInit(): Observable<Session | null> {
    const api = inject(AuthService);
    const store = inject(Store<AppState>);
    const router = inject(Router);

    console.log('Init application');

    // skip init if on auth pages
    const url = router.url;
    if (
        url.startsWith('/auth/login') ||
        url.startsWith('/auth/registration') ||
        url.startsWith('/auth/recovery')
    ) {
        return of(null);
    }

    // otherwise, fetch session from backend
    return api.session().pipe(
        map((session: Session) => {
            if (session) {
                store.dispatch(SetSessionAction({ session }));
            }
            return session;
        }),
        catchError(() => {
            // no session → stay null, don’t redirect here
            return of(null);
        })
    );
}
