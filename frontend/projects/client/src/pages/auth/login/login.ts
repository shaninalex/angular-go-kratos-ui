import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {AuthLoginFeature} from '@client/features/auth';

@Component({
    selector: 'kr-login',
    imports: [AuthLayout, RouterLink, AuthLoginFeature],
    template: `
        <kr-auth-layout title="Login" [ready]="!!form">
            <kr-auth-login-feature [form]="form" />
            Don't have an account? <a [routerLink]="['/auth/registration']" class="underline">Registration</a> <br />
            Forgot password? <a [routerLink]="['/auth/recovery']" class="underline">Recovery</a>
        </kr-auth-layout>
    `
})
export class Login {
    activatedRoute = inject(ActivatedRoute)
    form = this.activatedRoute.snapshot.data['form']
}
