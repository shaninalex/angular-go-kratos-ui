import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilderComponent} from '@client/features/auth'
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';

@Component({
    selector: 'kr-login',
    imports: [FormBuilderComponent, AuthLayout, RouterLink],
    template: `
        <kr-auth-layout title="Login" [ready]="!!form">
            <kr-form-builder [formUI]="form" (formSubmit)="onFormSubmit($event)" />
            Don't have an account? <a [routerLink]="['/auth/registration']" class="underline">Registration</a> <br />
            Forgot password? <a [routerLink]="['/auth/recovery']" class="underline">Recovery</a>
        </kr-auth-layout>
    `
})
export class Login {
    activatedRoute = inject(ActivatedRoute)
    form = this.activatedRoute.snapshot.data['form']

    onFormSubmit(data: any): void {
        console.log(data)
    }
}
