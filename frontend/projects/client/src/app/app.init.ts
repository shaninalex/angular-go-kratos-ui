import {map, Observable, of} from 'rxjs';
import {Session} from '@ory/kratos-client';
import {catchError} from 'rxjs/operators';
import {inject} from '@angular/core';
import {AuthService, SetSessionAction} from '@client/entities/auth';
import {Store} from '@ngrx/store';
import {AppState} from '@client/shared/common';
import {HttpErrorResponse} from '@angular/common/http';

export function appInit(): Observable<Session | null> {
    const api = inject(AuthService);
    const store = inject(Store<AppState>);
    const url = location.href
    if (
        url.includes('/auth/login') ||
        url.includes('/auth/registration') ||
        url.includes('/auth/verification') ||
        url.includes('/auth/recovery')
    ) {
        return of(null);
    }

    // otherwise, fetch session from backend
    return api.session().pipe(
        map((session: Session) => {
            if (session) {
                store.dispatch(SetSessionAction({session}));
            }
            return session;
        }),
        catchError((err: HttpErrorResponse) => {
            return of(null);
        })
    );
}
