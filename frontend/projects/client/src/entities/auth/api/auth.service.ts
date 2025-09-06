import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    LoginFlow, LogoutFlow, RecoveryFlow,
    RegistrationFlow, SettingsFlow, SuccessfulNativeLogin, SuccessfulNativeRegistration,
    UpdateLoginFlowBody,
    VerificationFlow
} from '@ory/kratos-client';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {
    loginWithOIDC,
    loginWithPassword,
    recoveryWithCode,
    registrationWithOIDC,
    registrationWithPassword,
    verificationWithCode
} from './helpers';

import {environment} from '@client/environments/environment.development';
import {SettingsPage} from '@client/pages/primary/settings-page/settings-page';

// Docs:
// https://www.ory.sh/docs/kratos/reference/api

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    http = inject(HttpClient);

    loginFlow(): Observable<LoginFlow> {
        return this.http.get<LoginFlow>(`${environment.KRATOS_ROOT}/self-service/login/browser`, {withCredentials: true})
    }

    registrationFlow(): Observable<RegistrationFlow> {
        return this.http.get<RegistrationFlow>(`${environment.KRATOS_ROOT}/self-service/registration/browser`, {withCredentials: true})
    }

    recoveryFlow(): Observable<RecoveryFlow> {
        return this.http.get<RecoveryFlow>(`${environment.KRATOS_ROOT}/self-service/recovery/browser`, {withCredentials: true})
    }

    verificationFlow(flowID: string): Observable<VerificationFlow> {
        const p = new HttpParams().set("id", flowID)
        return this.http.get<VerificationFlow>(`${environment.KRATOS_ROOT}/self-service/verification/flows`, {params: p, withCredentials: true})
    }

    logoutFlow(): Observable<LogoutFlow> {
        return this.http.get<LogoutFlow>(`${environment.KRATOS_ROOT}/self-service/logout/browser`, {withCredentials: true})
    }

    submitLoginFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<LoginFlow|SuccessfulNativeLogin> {
        let payload: UpdateLoginFlowBody;
        switch (data.group) {
            case 'oidc':
                payload = loginWithOIDC(data.value); // data.value contains OIDC provider
                break;
            case 'password':
                payload = loginWithPassword(data.form);
                break;
            default:
                throw new Error(`Unsupported method: ${data.action}`);
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RegistrationFlow>(
            `${environment.KRATOS_ROOT}/self-service/login`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }

    submitRegistrationFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<RegistrationFlow|SuccessfulNativeRegistration> {
        let payload: any;
        switch (data.group) {
            case 'oidc':
                payload = registrationWithOIDC(data.value); // data.value contains OIDC provider
                break;
            case 'password':
                payload = registrationWithPassword(data.form);
                break;
            default:
                throw new Error(`Unsupported method: ${data.action}`);
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RegistrationFlow|SuccessfulNativeRegistration>(
            `${environment.KRATOS_ROOT}/self-service/registration`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }

    submitVerificationFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<VerificationFlow> {
        let payload: any
        switch (data.group) {
            case "code":
                payload = verificationWithCode(data.form)
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<VerificationFlow>(
            `${environment.KRATOS_ROOT}/self-service/verification`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }

    submitRecoveryFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<RecoveryFlow> {
        let payload: any
        switch (data.group) {
            case "code":
                payload = recoveryWithCode(data.form)
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RecoveryFlow>(
            `${environment.KRATOS_ROOT}/self-service/recovery`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }
}
