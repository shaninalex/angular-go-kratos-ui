import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, shareReplay} from "rxjs";
import {environment as env} from '@environments/environment.development';
import {FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, VerificationFlow} from '@ory/kratos-client';
import {ApiResponse} from "@shared/api";

export const AUTH_URLS = {
    // TODO: change urls. Change "/api/v2/auth/get-<target>-form" to simple "/api/auth/<target>"
    LOGIN: `${env.API_ROOT}/api/v2/auth/get-login-form`,
    REGISTRATION: `${env.API_ROOT}/api/v2/auth/get-registration-form`,
    VERIFICATION: `${env.API_ROOT}/api/v2/auth/get-verification-form`,
    RECOVERY: `${env.API_ROOT}/api/v2/auth/recovery-form`,
    ERROR: `${env.API_ROOT}/api/v2/auth/error`,
}

@Injectable({providedIn: "root"})
export class AuthService {
    http: HttpClient = inject(HttpClient)

    public GetLoginForm(flow: string | null = null): Observable<LoginFlow> {
        return this.getForm<LoginFlow>(AUTH_URLS.LOGIN, flow);
    }

    public GetRegistrationForm(flow: string | null = null): Observable<RegistrationFlow> {
        return this.getForm<RegistrationFlow>(AUTH_URLS.REGISTRATION, flow);
    }

    public GetVerificationForm(flow: string | null = null): Observable<VerificationFlow> {
        return this.getForm<VerificationFlow>(AUTH_URLS.VERIFICATION, flow);
    }

    public GetRecoveryForm(flow: string | null = null): Observable<RecoveryFlow> {
        return this.getForm<RecoveryFlow>(AUTH_URLS.RECOVERY, flow);
    }

    public GetError(flow: string): Observable<ApiResponse<FlowError>> {
        let params = new HttpParams().set("id", flow);
        // this.uiService.loading.next(true);
        return this.http.get<ApiResponse<FlowError>>(AUTH_URLS.ERROR, {params: params, withCredentials: true}).pipe(
            shareReplay(),
            // finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    private getForm<T>(url: string, flow: string | null = null): Observable<T> {
        let params = new HttpParams();
        if (flow) params = params.append("flow", flow);
        // this.uiService.loading.next(true);
        return this.http.get<T>(url, {params: params, withCredentials: true}).pipe(
            shareReplay(),
            // finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                if (this.isStatusGone(error.status)) {
                    this.getNewFlowRedirect(url)
                    return EMPTY;
                }
                console.error(error);
                return EMPTY;
            })
        );
    }

    private isStatusGone(status: number): boolean {
        return status === 410;
    }

    private getNewFlowRedirect(url: string) {
        switch (url) {
            case AUTH_URLS.LOGIN:
                window.location.href = env.AUTH_URL_LOGIN_REDIRECT;
                break;
            case AUTH_URLS.REGISTRATION:
                window.location.href = env.AUTH_URL_REGISTRATION_REDIRECT;
                break;
            case AUTH_URLS.RECOVERY:
                window.location.href = env.AUTH_URL_RECOVERY_REDIRECT;
                break;
        }
    }
}
