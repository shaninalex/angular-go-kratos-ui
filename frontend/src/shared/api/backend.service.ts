import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import {environment as env} from '@environments/environment.development';
import {LogoutFlow, Session} from '@ory/kratos-client';

export const BACKEND = {
    // TODO: change urls. Change "/api/v2/auth/get-<target>-form" to simple "/api/auth/<target>"
    SESSION: `${env.API_ROOT}/api/v2/auth/check-session`,
    LOGOUT: `${env.API_ROOT}/api/v2/auth/logout`,
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

    public getSession(): Observable<Session> {
        return this.handleRequest(this.http.get<Session>(BACKEND.SESSION, { withCredentials: true }));
    }

    public logout(): Observable<LogoutFlow> {
        return this.handleRequest(this.http.get<LogoutFlow>(BACKEND.LOGOUT, { withCredentials: true }));
    }
}
