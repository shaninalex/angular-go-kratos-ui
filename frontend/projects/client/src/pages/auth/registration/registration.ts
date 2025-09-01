import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {FormBuilderComponent} from '@client/features/auth';

@Component({
    selector: 'kr-registration',
    imports: [
        AuthLayout,
        FormBuilderComponent,
        RouterLink,
    ],
    template: `
        <kr-auth-layout title="Registration" [ready]="!!form">
            <kr-form-builder [formUI]="form" (formSubmit)="onFormSubmit($event)" />
            Already have an account? <a [routerLink]="['/auth/login']" class="underline">Login</a>
        </kr-auth-layout>
    `
})
export class Registration {
    activatedRoute = inject(ActivatedRoute)
    form = this.activatedRoute.snapshot.data['form']

    onFormSubmit(data: any): void {
        console.log(data)
    }
}
