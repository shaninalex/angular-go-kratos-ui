import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';


export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree
{
    /*

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

    */
    return true
}
