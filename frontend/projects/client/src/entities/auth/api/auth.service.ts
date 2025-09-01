import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationFlow, LoginFlow, VerificationFlow} from '@ory/kratos-client';

// Docs:
// https://www.ory.sh/docs/kratos/reference/api

// base Kratos url
const baseURL = "http://localhost:4433"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    http = inject(HttpClient);

    LoginFlow(): Observable<LoginFlow> {
        return this.http.get<LoginFlow>(`${baseURL}/self-service/login/browser`, {withCredentials: true})
    }

    RegistrationFlow(): Observable<RegistrationFlow> {
        return this.http.get<RegistrationFlow>(`${baseURL}/self-service/registration/browser`, {withCredentials: true})
    }

    GetVerificationFlow(): Observable<VerificationFlow> {
        return this.http.get<VerificationFlow>(`${baseURL}/self-service/verification/flows`, {withCredentials: true})
    }
}
