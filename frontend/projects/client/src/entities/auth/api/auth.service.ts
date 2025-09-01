import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginFlow, RegistrationFlow, UpdateRegistrationFlowBody, VerificationFlow} from '@ory/kratos-client';
import {FormBuilderSubmitPayload} from '@client/shared/common';

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

    submitRegistrationFlow(flowID: string, data: FormBuilderSubmitPayload): Observable<RegistrationFlow> {
        let payload: UpdateRegistrationFlowBody;
        switch (data.group) {
            case 'oidc':
                payload = this.withOidc(data.value['provider']);
                break;
            case 'password':
                payload = this.withPassword(data.value['password'], data.value['csrf_token'], data.value);
                break;
            default:
                throw new Error(`Unsupported method: ${data.group}`);
        }
        const p = new HttpParams().set("flow", flowID)
        return this.http.post<RegistrationFlow>(
            `${baseURL}/self-service/registration`,
            payload,
            {
                params: p,
                withCredentials: true,
            },
        )
    }

    private withOidc(provider: string): UpdateRegistrationFlowBody {
        return { method: 'oidc', provider };
    }

    private withPassword(password: string, csrf: string, traits: any): UpdateRegistrationFlowBody {
        return {
            method: 'password',
            password,
            csrf_token: csrf,
            traits: {
                email: traits['traits.email'],
                name: {
                    first: traits['traits.name.first'],
                    last: traits['traits.name.last'],
                },
            },
        };
    }
}
