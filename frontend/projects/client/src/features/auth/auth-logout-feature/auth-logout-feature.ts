import {Component, inject} from '@angular/core';
import {AuthService} from '@client/entities/auth';

@Component({
    selector: 'kr-auth-logout-feature',
    imports: [],
    template: `
        <button class="underline cursor-pointer" (click)="logoutAction()">
            @if (!loading) {
                Logout
            } @else {
                loading...
            }
        </button>
        @if (error) {
            <div class="text-sm text-red-500">{{ error }}</div>
        }
    `,
})
export class AuthLogoutFeature {
    private api = inject(AuthService);
    loading: boolean = false
    error: string | undefined = undefined

    logoutAction(): void {
        this.error = undefined
        this.loading = true
        this.api.logoutFlow().subscribe({
            next: data => window.location.href = data.logout_url,
            error: (err) => {
                this.error = err.error?.error?.reason
                this.loading = false
            },
        })
    }
}
