import {Component} from '@angular/core';
import {LoginFormComponent} from '@features/auth';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-page-login',
    imports: [
        LoginFormComponent,
        RouterLink
    ],
    template: `<div>
        <auth-login-form />
        <div>
            Do not have an account? <a class="underline" routerLink="/auth/registration">Register</a>
        </div>
    </div>`
})
export class LoginPageComponent {}
