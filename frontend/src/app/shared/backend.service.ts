import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, shareReplay } from "rxjs";
import { GeneralError } from "../typedefs/error";
import { UIService } from "./ui.service";


@Injectable({
    providedIn: "root"
})
export class BackendService {
    constructor(
        private http: HttpClient,
        private uiService: UIService
    ) {}

    private handleRequest<T>(observable: Observable<T>): Observable<T> {
        return observable.pipe(
            finalize(() => this.uiService.loading.next(false)),
            shareReplay()
        );
    }

    getSessionInformation(): Observable<any> {
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/check-session`, { withCredentials: true }));
    }

    getLogoutLink(): Observable<any> {
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/logout`, { withCredentials: true }));
    }

    getSettingsForm(): Observable<any> {
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/settings`, { withCredentials: true }));
    }

    getError(error_id: string | null = null): Observable<GeneralError> {
        let params = new HttpParams();
        if (error_id) params = params.append("id", error_id);
        return this.handleRequest(this.http.get<GeneralError>(`/api/v2/auth/error`, { params: params, withCredentials: true }));
    }

    createVerificationFlow(): Observable<any> {
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/create-verification-form`, { withCredentials: true }));
    }

    getLoginFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/get-login-form`, { params: params, withCredentials: true }))
    }

    getRegistrationFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        console.log(params)
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/get-registration-form`, { params: params, withCredentials: true }));
    }

    formGetVerification(flow: string): Observable<any> {
        let params = new HttpParams().append("flow", flow);
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/get-verification-form`, { params: params, withCredentials: true }))
    }

    getRecoveryFlow(flow: string | null = null): Observable<any> {
        let params = new HttpParams();
        if (flow) params = params.append("id", flow);
        return this.handleRequest(this.http.get<any>(`/api/v2/auth/recovery-form`, { params: params, withCredentials: true }))
    }
}
