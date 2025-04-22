import {inject, Injectable} from '@angular/core';
import {UpdateLoginFlowWithPasswordMethod} from '@ory/kratos-client/api';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment as env} from '@environments/environment.development';
import {Observable, shareReplay} from 'rxjs';
import {
    Session,
    SettingsFlow,
    SuccessfulNativeRegistration,
    UpdateRegistrationFlowWithPasswordMethod,
    UpdateSettingsFlowBody, UpdateSettingsFlowWithProfileMethod,
    UpdateVerificationFlowWithCodeMethod,
    VerificationFlow
} from '@ory/kratos-client';
import {ApiResponse} from '@shared/api';

/*

NOTE:

AuthSubmitService and AuthFormServices probably should be global and moved into shared/api folder
since they both will be used for settings form also.

They both can be combined into single service.

For now, it's only for developing and proof of concept

*/
export const SUBMIT_URLS = {
    LOGIN: `${env.API_ROOT}/api/v2/auth/login`,
    REGISTER: `${env.API_ROOT}/api/v2/auth/register`,
    VERIFY: `${env.API_ROOT}/api/v2/auth/verify`,
    SETTINGS: `${env.API_ROOT}/api/v2/auth/settings`,
}

@Injectable({providedIn: "root"})
export class AuthSubmitService {
    http: HttpClient = inject(HttpClient)

    login(payload: UpdateLoginFlowWithPasswordMethod, flow: string) {
        let params = new HttpParams().set("flow", flow);
        return this.http.post<ApiResponse<Session>>(SUBMIT_URLS.LOGIN, payload, {
            params: params,
            withCredentials: true
        }).pipe(
            shareReplay(),
        );
    }

    register(payload: UpdateRegistrationFlowWithPasswordMethod, flow: string): Observable<SuccessfulNativeRegistration> {
        let params = new HttpParams().set("flow", flow);
        return this.http.post<SuccessfulNativeRegistration>(SUBMIT_URLS.REGISTER, payload, {
            params: params,
            withCredentials: true
        })
    }

    verify(payload: UpdateVerificationFlowWithCodeMethod, flow: string): Observable<VerificationFlow> {
        let params = new HttpParams().set("flow", flow);
        return this.http.post<VerificationFlow>(SUBMIT_URLS.VERIFY, payload, {
            params: params,
            withCredentials: true
        })
    }

    updateSettings(
        formValues: Record<string, any>,
        groupName: "lookup_secret" | "oidc" | "passkey" | "password" | "profile" | "totp" | "webauthn",
        flow: string,
    ) {
        const basePayload = {
            csrf_token: formValues["default"]?.csrf_token,
            method: groupName,
        };
        let payload: Record<string, any> = { ...basePayload };

        delete formValues[groupName]["method"]

        if (groupName === "profile") {
            payload['traits'] = {
                "email": formValues[groupName]["traits.email"]
            };
        } else if (groupName === "password") {
            payload['password'] = formValues[groupName]["password"];
        }

        // TODO: other settings

        const params = new HttpParams().set("flow", flow);
        return this.http.post<SettingsFlow>(SUBMIT_URLS.SETTINGS, payload, {
            params,
            withCredentials: true,
        });
    }
}
