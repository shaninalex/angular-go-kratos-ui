import {Component} from '@angular/core';
import {AuthLayoutComponent} from '@app/layout';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-auth-pages',
    imports: [
        AuthLayoutComponent,
        RouterOutlet
    ],
    template: `
        <layout-auth>
            <router-outlet/>
        </layout-auth>
    `
})
export class AuthPageWrapperComponent {}
