import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import {environment as env} from '@environments/environment.development';

export const BACKEND = {
    // TODO: change urls. Change "/api/v2/auth/get-<target>-form" to simple "/api/auth/<target>"
    SESSION: `${env.API_ROOT}/api/v2/auth/check-session`,
}

@Injectable({
    providedIn: "root"
})
export class BackendService {
    constructor(
        private http: HttpClient,
    ) {}

    private handleRequest<T>(observable: Observable<T>): Observable<T> {
        return observable.pipe(
            shareReplay()
        );
    }

    public getSession(): Observable<any> {
        return this.handleRequest(this.http.get<any>(BACKEND.SESSION, { withCredentials: true }));
    }
}
