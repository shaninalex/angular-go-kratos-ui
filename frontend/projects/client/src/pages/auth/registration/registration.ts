import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {AuthRegistrationFeature} from '@client/features/auth-registration-feature';

@Component({
    selector: 'kr-registration',
    imports: [
        AuthLayout,
        RouterLink,
        AuthRegistrationFeature,
    ],
    template: `
        <kr-auth-layout title="Registration" [ready]="!!form">
            <kr-auth-registration-feature [form]="form" />
            Already have an account? <a [routerLink]="['/auth/login']" class="underline">Login</a>
        </kr-auth-layout>
    `
})
export class Registration {
    form = inject(ActivatedRoute).snapshot.data['form']
}
