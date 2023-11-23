import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AccountService {
    constructor(private http: HttpClient) {}

    getSessionInformation(): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8080/api/v2/auth/check-session`, { withCredentials: true }).pipe(
            shareReplay()
        )
    }
}
