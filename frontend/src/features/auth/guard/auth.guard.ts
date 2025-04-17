import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {inject} from '@angular/core';
import {BackendService} from '@shared/api';
import {Store} from '@ngrx/store';
import {AppState} from '@shared/store';
import {SetSession} from '@features/auth';

export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {

    const router = inject(Router);
    const store = inject(Store<AppState>);
    const currentUser = inject(BackendService).getSession();

    return <
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree
        >currentUser.pipe(
        map((data) => {
            if (data) store.dispatch(SetSession({session: data}));
            return of(true);
        }),
        catchError((err) => {
            if (err.status === 401) return router.navigate(["/auth/login"]);
            return of(err)
        }),
    );
}
