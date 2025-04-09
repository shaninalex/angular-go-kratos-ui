import {Component} from '@angular/core';
import {LoginFormComponent} from '@features/auth';

@Component({
    selector: 'app-page-login',
    imports: [
        LoginFormComponent
    ],
    template: `<auth-login-form />`
})
export class LoginPageComponent {}
