import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient
    ) {}

    getLoginFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        return this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-login-form`, { params: params, withCredentials: true }).pipe(
            shareReplay()
        );
    }

    getRegistrationFlow(): Observable<any> { // TODO: Interface for Login flow
        // TODO: use HttpParam
        return this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-registration-form`, { withCredentials: true }).pipe(
            shareReplay()
        )
    }

    formGetVerification(flow: string): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-verification-form?flow=${flow}`, { withCredentials: true }).pipe(
            shareReplay(),
        );
    }
}
