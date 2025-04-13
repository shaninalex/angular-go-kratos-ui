import {inject, Injectable} from '@angular/core';
import {UpdateLoginFlowWithPasswordMethod} from '@ory/kratos-client/api';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '@shared/api';
import {
    LoginFlow,
    RegistrationFlow,
    SuccessfulNativeRegistration,
    UpdateRegistrationFlowWithPasswordMethod
} from '@ory/kratos-client';
import {Observable, shareReplay} from 'rxjs';
import {environment as env} from '@environments/environment.development';

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
}


@Injectable({providedIn: "root"})
export class AuthSubmitService {
    http: HttpClient = inject(HttpClient)

    login(payload: UpdateLoginFlowWithPasswordMethod, flow: string) {
        let params = new HttpParams().set("flow", flow);
        return this.http.post<ApiResponse<LoginFlow>>(SUBMIT_URLS.LOGIN, payload, {
            params: params,
            withCredentials: true
        }).pipe(
            shareReplay(),
        );
    }

    register(payload: UpdateRegistrationFlowWithPasswordMethod, flow: string): Observable<SuccessfulNativeRegistration | RegistrationFlow> {
        let params = new HttpParams().set("flow", flow);
        return this.http.post<SuccessfulNativeRegistration | RegistrationFlow>(SUBMIT_URLS.REGISTER, payload, {
            params: params,
            withCredentials: true
        })
    }
}
