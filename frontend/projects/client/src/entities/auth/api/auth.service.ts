import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    LoginFlow,
    RegistrationFlow, SuccessfulNativeRegistration,
    UpdateLoginFlowBody,
    UpdateRegistrationFlowBody,
    VerificationFlow
} from '@ory/kratos-client';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {
    loginWithOIDC,
    loginWithPassword,
    registrationWithOIDC,
    registrationWithPassword,
    registrationWithProfile
} from './helpers';

// Docs:
// https://www.ory.sh/docs/kratos/reference/api

// base Kratos url
const baseURL = "http://localhost:4433"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    http = inject(HttpClient);

    loginFlow(): Observable<LoginFlow> {
        return this.http.get<LoginFlow>(`${baseURL}/self-service/login/browser`, {withCredentials: true})
    }

    registrationFlow(): Observable<RegistrationFlow> {
        return this.http.get<RegistrationFlow>(`${baseURL}/self-service/registration/browser`, {withCredentials: true})
    }

    getVerificationFlow(): Observable<VerificationFlow> {
        return this.http.get<VerificationFlow>(`${baseURL}/self-service/verification/flows`, {withCredentials: true})
    }

    submitLoginFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<LoginFlow> {
        let payload: UpdateLoginFlowBody;
        switch (data.group) {
            case 'oidc':
                payload = loginWithOIDC(data.value['provider']);
                break;
            case 'password':
                payload = loginWithPassword(data.value['identifier'], data.value['password'], data.value['csrf_token']);
                break;
            default:
                throw new Error(`Unsupported method: ${data.group}`);
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RegistrationFlow>(
            `${baseURL}/self-service/login`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }

    submitRegistrationFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<RegistrationFlow|SuccessfulNativeRegistration> {
        let payload: UpdateRegistrationFlowBody;
        switch (data.group) {
            case 'oidc':
                payload = registrationWithOIDC(data.value['provider']);
                break;
            case 'password':
                console.log(data)
                payload = registrationWithPassword(data.value['password'], data.value['csrf_token'], data.value);
                break;
            case 'profile':
                payload = registrationWithProfile(data.value['csrf_token'], data.value);
                break;
            default:
                throw new Error(`Unsupported method: ${data.group}`);
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RegistrationFlow|SuccessfulNativeRegistration>(
            `${baseURL}/self-service/registration`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }
}
