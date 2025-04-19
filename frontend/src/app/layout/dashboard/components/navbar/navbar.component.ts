import {Component, inject, OnDestroy} from '@angular/core';
import {BackendService} from '@shared/api';
import {filter, map, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AppState} from '@shared/store';
import {Store} from '@ngrx/store';
import {selectSession} from '@features/auth';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'navbar',
    imports: [
        RouterLink,
        RouterLinkActive,
        AsyncPipe
    ],
    template: `
        <div class="flex justify-between items-center py-4 border-b mb-4">
            <a routerLinkActive="underline" routerLink="/" [routerLinkActiveOptions]="{exact: true}">
                @if (userLabel$ | async; as userLabel) {
                    {{ userLabel }}
                } @else {
                    <strong>Profile</strong>
                }
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
    store: Store<AppState> = inject<Store<AppState>>(Store<AppState>)
    userLabel$: Observable<string> = this.store.select(selectSession).pipe(
        filter(session => session !== null),
        map(session => session.identity),
        filter(identity => identity !== undefined),
        map(identity => identity.traits["email"])
    )

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    logout(): void {
        this.subscription.add(this.backendService.logout().pipe(
            map(data => window.location.href = data.logout_url),
        ).subscribe())
    }
}
