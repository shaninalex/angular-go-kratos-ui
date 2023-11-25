import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, of, shareReplay } from "rxjs";
import { AuthUIService } from "./authui.service";

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private uiService: AuthUIService
    ) { }

    private handleRequest<T>(observable: Observable<T>): Observable<T> {
        return observable.pipe(
            finalize(() => this.uiService.loading.next(false)),
            shareReplay()
        );
    }

    getLoginFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        return this.handleRequest(this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-login-form`, { params: params, withCredentials: true }))
    }

    getRegistrationFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        return this.handleRequest(this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-registration-form`, { params: params, withCredentials: true }))
    }

    formGetVerification(flow: string): Observable<any> {
        let params = new HttpParams().append("flow", flow);
        return this.handleRequest(this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/get-verification-form`, { params: params, withCredentials: true }))
    }
}
