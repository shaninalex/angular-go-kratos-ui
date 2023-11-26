import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { inject } from "@angular/core";
import { BackendService } from "./backend.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/identity/reducer";
import { SetIdentity } from "../store/identity/actions";


export function CanActiveteAccountPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree
{
    const currentUser = inject(BackendService).getSessionInformation();
    const router = inject(Router);
    const store = inject(Store<AppState>);

    return <
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree
    >currentUser.pipe(
        map((data) => {
            if (data) store.dispatch(SetIdentity({user_info: data}));
            return of(true);
        }),
        catchError((err) => {
            if (err.status === 401) return router.navigate(["/auth/login"]);
            return of(err)
        }),
    );
}
