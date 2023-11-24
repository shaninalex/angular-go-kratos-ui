import { Component } from "@angular/core"
import { BackendService, Logout } from "../../services/backend.service";
import { Observable } from "rxjs";


@Component({
    selector: "app-logout",
    template: `
        <div *ngIf="(logout$ | async) as logout">
            <a href="{{ logout.logout_url }}">logout</a>
        </div>
    `
})
export class LogoutComponent {
    logout$: Observable<Logout>;

    constructor(private backend: BackendService) {
       this.logout$ = this.backend.getLogoutLink();
    }

}
