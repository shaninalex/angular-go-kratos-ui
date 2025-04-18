import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, filter, map, Observable, of, switchMap, take} from 'rxjs';
import {inject} from '@angular/core';
import {BackendService} from '@shared/api';
import {Store} from '@ngrx/store';
import {AppState} from '@shared/store';
import {selectSession, SetSession} from '@features/auth';

export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {

    const router = inject(Router);
    const store = inject(Store<AppState>);
    const backendService = inject(BackendService);

    return store.select(selectSession).pipe(
        take(1),
        switchMap(session => {
            if (session) {
                return of(true);
            } else {
                return backendService.getSession().pipe(
                    map(data => {
                        store.dispatch(SetSession({ session: data }));
                        return true;
                    }),
                    catchError(error => {
                        if (error.status === 401) {
                            return of(router.createUrlTree(['/auth/login']));
                        } else {
                            console.error('AuthGuard: Session retrieval failed', error);
                            return of(false);
                        }
                    })
                );
            }
        })
    );
}
