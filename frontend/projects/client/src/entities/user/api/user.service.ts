import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SettingsFlow} from '@ory/kratos-client';
import {environment} from '@client/environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {toPasswordPayload, toProfilePayload, toTOTPPayload} from '@client/entities/user/api/helpers';

@Injectable()
export class UserService {
    http = inject(HttpClient);

    settingsFlow(flowID?: string): Observable<SettingsFlow> {
        if (!flowID) {
            return this.http.get<SettingsFlow>(`${environment.KRATOS_ROOT}/self-service/settings/browser`, {withCredentials: true})
        } else {
            const params = new HttpParams().set("id", flowID)
            return this.http.get<SettingsFlow>(`${environment.KRATOS_ROOT}/self-service/settings/flows`, {
                params,
                withCredentials: true
            })
        }
    }

    submitSettingsForm(flowID: string, data: FormBuilderSubmitPayload): Observable<SettingsFlow> {
        let payload: any;
        switch (data.group) {
            case 'profile':
                payload = toProfilePayload(data.form)
                break
            case 'password':
                payload = toPasswordPayload(data.form)
                break
            case 'lookup_secret':
                throw new Error(`not implemented`);
                break
            case 'totp':
                payload = toTOTPPayload(data.form)
                break
            default:
                throw new Error(`Unsupported method: ${data.group}`);
        }

        const params = new HttpParams().set("flow", flowID)
        return this.http.post<SettingsFlow>(`${environment.KRATOS_ROOT}/self-service/settings`, payload, { params, withCredentials: true })
    }
}
