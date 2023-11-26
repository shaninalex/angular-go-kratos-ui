import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http"
import { GeneralError } from "src/app/typedefs/error";

export interface Logout {
    logout_url: string
    logout_token: string
}

@Injectable()
export class BackendService {

    private api_url: string = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    getLogoutLink(): Observable<Logout> {
        return this.http.get<Logout>(`${this.api_url}/api/v2/auth/logout`, { withCredentials: true }).pipe(
            shareReplay(),
        );
    }

    getSettingsForm(): Observable<Logout> {
        return this.http.get<Logout>(`${this.api_url}/api/v2/auth/settings`, { withCredentials: true }).pipe(
            shareReplay()
        );
    }

    getError(error_id: string | null = null): Observable<GeneralError> {
        let params = new HttpParams();
        if (error_id) params = params.append("id", error_id);
        return this.http.get<GeneralError>(`${this.api_url}/api/v2/auth/error`, { params: params, withCredentials: true }).pipe(
            shareReplay()
        );
    }

    createVerificationFlow(): Observable<Logout> {
        return this.http.get<Logout>(`${this.api_url}/api/v2/auth/create-verification-form`, { withCredentials: true }).pipe(
            shareReplay()
        );
    }
}
