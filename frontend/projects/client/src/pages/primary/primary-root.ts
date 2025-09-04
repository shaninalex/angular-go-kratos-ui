import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthLogoutFeature} from '@client/features/auth';

@Component({
    selector: 'kr-primary-root',
    imports: [
        RouterLink,
        RouterOutlet,
        AuthLogoutFeature
    ],
    template: `
        <ul>
            <li><a class="underline" [routerLink]="['/auth/login']">Login</a></li>
            <li><a class="underline" [routerLink]="['/auth/registration']">Registration</a></li>
        </ul>
        <kr-auth-logout-feature />

        <hr class="my-4">

        <router-outlet></router-outlet>
    `
})
export class PrimaryRoot {

}
