import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {UserLogoutFeature} from '@client/features/user';
import {UserService} from '@client/entities/user';

@Component({
    selector: 'kr-primary-root',
    imports: [
        RouterLink,
        RouterOutlet,
        UserLogoutFeature,
    ],
    providers: [
        UserService
    ],
    template: `
        <div class="p-4">
            <ul>
                <li><a class="underline" [routerLink]="['/']">Home</a></li>
                <li><a class="underline" [routerLink]="['/settings']">Settings</a></li>
            </ul>
            <kr-user-logout-feature />
            <hr class="my-4">
            <router-outlet></router-outlet>
        </div>
    `
})
export class PrimaryRoot {

}
