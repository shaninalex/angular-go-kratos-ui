import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'page-home',
    imports: [
        RouterLink
    ],
    template: `
        home page <br>
        <a class="underline" routerLink="/auth/login">login</a>
    `
})
export class HomePageComponent {}
