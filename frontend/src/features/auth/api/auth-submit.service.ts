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
    UpdateSettingsFlowBody,
    UpdateVerificationFlowWithCodeMethod,
    VerificationFlow
} from '@ory/kratos-client';
import {ApiResponse} from '@shared/api';
import {TGroup} from '@shared/adapters';


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
        });
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
        groupName: TGroup,
        flow: string,
    ) {
        const f = new UpdateSettingsFactory(formValues)
        const payload = f.payload(groupName)
        const params = new HttpParams().set("flow", flow);
        return this.http.post<SettingsFlow>(SUBMIT_URLS.SETTINGS, payload, {
            params,
            withCredentials: true,
        });
    }
}

class UpdateSettingsFactory {
    formValues: Record<string, any>;

    constructor(formValues: Record<string, any>) {
        this.formValues = formValues
    }

    payload(groupName: TGroup): UpdateSettingsFlowBody {
        console.log(this.formValues)
        const basePayload = {
            csrf_token: this.formValues["default"]?.csrf_token,
            method: groupName,
        };
        delete this.formValues[groupName]["method"]
        let payload: Record<string, any> = {...basePayload};
        switch (groupName) {
            case "webauthn":
                throw Error("not implemented")

            case "profile":
                payload['traits'] = {
                    "email": this.formValues[groupName]["traits.email"]
                };
                break
            case "password":
                payload['password'] = this.formValues[groupName]["password"];
                break
            case "passkey":
            case "oidc":
                throw Error("not implemented")
            case "totp":
            case "lookup_secret":
                payload = {
                    ...payload,
                    ...this.normalize(this.formValues[groupName]),
                };
                break
            default:
                throw Error("not implemented")
        }
        return payload as UpdateSettingsFlowBody
    }

    private normalize(p: Record<string, any>): Record<string, any> {
        let result: Record<string, any> = {}
        for (const key in p) {
            const v = p[key];
            if (v === "true") {
                result[key] = true;
            } else if (v === "false") {
                result[key] = false;
            // } else if (v === "" || v === null) {
            //     result[key] = undefined;
            // } else if (!isNaN(v) && v.trim() !== "") {
            //     result[key] = Number(v);
            } else {
                result[key] = v;
            }
        }
        return result
    }
}
