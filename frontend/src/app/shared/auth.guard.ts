import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { AuthService } from "../auth/services/auth.service";
import { inject } from "@angular/core";
import { AccountService } from "./account.service";

export function CanActiveteAccountPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree 
{
    const currentUser = inject(AccountService).getSessionInformation();

    return <Observable<boolean>>currentUser.pipe(
        map((data:any) => {
            console.log(data);
            return of(true);
        }),
        catchError((data:any) => {
            return of(false); // TODO: Redirect to /auth/login
        }),
    );
}