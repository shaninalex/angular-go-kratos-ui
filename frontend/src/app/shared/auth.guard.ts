import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { inject } from "@angular/core";
import { AccountService } from "./account.service";


export function CanActiveteAccountPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree
{
    const currentUser = inject(AccountService).getSessionInformation();
    const router = inject(Router);

    return <
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree
    >currentUser.pipe(
        map(() => {
            return of(true);
        }),
        catchError((err) => {
            console.log(err.error.error);
            return of(err)
            // return router.navigate(["/auth/login"]);
        }),
    );
}
