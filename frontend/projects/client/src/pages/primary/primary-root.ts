import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'kr-primary-root',
    imports: [
        RouterLink
    ],
    template: `
        <p>dev links:</p>
        <ul>
            <li><a class="underline" [routerLink]="['/auth/login']">login</a></li>
            <li><a class="underline" [routerLink]="['/auth/registration']">registration</a></li>
        </ul>
    `
})
export class PrimaryRoot {

}
