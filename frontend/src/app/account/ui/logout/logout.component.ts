import { Component, ViewEncapsulation } from "@angular/core"
import { BackendService } from "src/app/shared/backend.service";


@Component({
    selector: "#logout",
    template: `<button type="button" class="btn btn-link" (click)="performLogout()">logout</button>`,
    encapsulation: ViewEncapsulation.None
})
export class LogoutComponent {
    constructor(private backend: BackendService) {}

    performLogout(): void {
        this.backend.getLogoutLink().subscribe({
            next: data => {
                window.location.href = data.logout_url;
            },
            error: err => {
                console.log("can't get logout link...")
            }
        })
    }

}
