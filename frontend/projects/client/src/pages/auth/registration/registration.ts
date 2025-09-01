import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {FormBuilderComponent} from '@client/features/auth';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload, RegistrationFlowPayload} from '@client/shared/common';

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
    api = inject(AuthService)

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        const payload: RegistrationFlowPayload = {
            method: data.group,
            csrf_token: data.value["csrf_token"],
            password: data.value["password"],
            traits: {
                email: data.value["traits.email"],
                name: {
                    first: data.value["traits.name.first"],
                    last: data.value["traits.name.last"],
                }
            }
        }
        this.api.SubmitRegistrationFlow(this.form.id, payload).subscribe(data => {
            console.log(data)
        })
    }
}

/*

{
    "values": {
        "provider": "google",
        "csrf_token": "mSMjq/tQoSfNGqs3DXusuA6NYZTi0ZVuBRJn7WcG2J8oIvfW/bxht+5WBBMJamtzGVpNGpHfGexGngamYgmZPg==",
        "traits.email": "",
        "password": "",
        "traits.name.first": "",
        "traits.name.last": "",
        "method": "password"
    },
    "group": "password"
}

*/
