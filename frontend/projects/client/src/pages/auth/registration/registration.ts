import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {FormBuilderComponent} from '@client/features/auth';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload, RegistrationFlowPayload, Traits} from '@client/shared/common';
import {UpdateRegistrationFlowBody} from '@ory/kratos-client'

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
        let payload: UpdateRegistrationFlowBody;
        switch (data.group) {
            case 'oidc':
                payload = this.withOidc(data.value["provider"]);
                break;
            case 'password':
                payload = this.withPassword(data.value["password"], data.value["csrf_token"], data.value);
                break;
            default:
                throw new Error(`Unsupported method: ${data.group}`);
        }

        this.api.SubmitRegistrationFlow(this.form.id, payload).subscribe({
            next: (res) => {
                console.log(data)
                // TODO: handle success continuity response
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    // if submitted form was oidc - do the redirect to provider
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    // set response form with errors
                    this.form = err.error
                }
            }
        })
    }

    withOidc(provider: string): UpdateRegistrationFlowBody {
        return { method: 'oidc', provider };
    }

    withPassword(password: string, csrf: string, traits: any): UpdateRegistrationFlowBody {
        return {
            method: 'password',
            password: password,
            csrf_token: csrf,
            traits: {
                email: traits["traits.email"],
                name: {
                    first: traits["traits.name.first"],
                    last: traits["traits.name.last"],
                }
            }
        };
    }
}

