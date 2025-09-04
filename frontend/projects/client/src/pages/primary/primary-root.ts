import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'kr-primary-root',
    imports: [
        RouterLink,
        RouterOutlet
    ],
    template: `
        <p>dev links:</p>
        <ul>
            <li><a class="underline" [routerLink]="['/auth/login']">login</a></li>
            <li><a class="underline" [routerLink]="['/auth/registration']">registration</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class PrimaryRoot {

}
