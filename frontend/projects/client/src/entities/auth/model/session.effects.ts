import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Session} from '@ory/kratos-client';
import {environment} from '@client/environments/environment.development';
import {GetSessionAction, SetSessionAction} from './session.actions';

export const sessionRenew = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
    ) => {
        return actions$.pipe(
            ofType(GetSessionAction.type),
            // TODO: renew session in background
            exhaustMap(() => http.get<Session>(`${environment.KRATOS_ROOT}/sessions/whoami`, {withCredentials: true}).pipe(
                switchMap(data => of(SetSessionAction({session: data}))),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        router.navigate(['/auth/login']);
                        return of({type: "[session] error"});
                    }
                    return of({type: "[session] error"});
                }),
            ))
        );
    },
    {functional: true, dispatch: true}
);
