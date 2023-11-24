import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http"

export interface Logout {
    logout_url: string
    logout_token: string
}

@Injectable()
export class BackendService {

    private api_url: string = "http://127.0.0.1:8080";

    constructor(private http: HttpClient) {}

    getLogoutLink(): Observable<Logout> {
       return this.http.get<Logout>(`${this.api_url}/api/v2/auth/logout`, { withCredentials: true}).pipe(
           shareReplay()
       );
    }

}
