import {Component, inject, OnDestroy} from '@angular/core';
import {BackendService} from '@shared/api';
import {map, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'navbar',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    template: `
        <div class="flex justify-between items-center py-4 border-b mb-4">
            <a routerLinkActive="underline" routerLink="/" [routerLinkActiveOptions]="{exact: true}">
                <strong>Profile</strong>
            </a>
            <div class="flex gap-2">
                <a routerLinkActive="underline" routerLink="/settings">Settings</a>
                <button class="cursor-pointer" (click)="logout()">Logout</button>
            </div>
        </div>
    `
})
export class NavbarComponent implements OnDestroy {
    backendService = inject(BackendService);
    http: HttpClient = inject(HttpClient)
    subscription: Subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    logout(): void {
        const sub = this.backendService.logout().pipe(
            map(data => window.location.href = data.logout_url),
        ).subscribe()
        this.subscription.add(sub)
    }
}
