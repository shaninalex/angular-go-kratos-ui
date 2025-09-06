import {Component, inject, Input} from '@angular/core';
import {RecoveryFlow, RegistrationFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {Router} from '@angular/router';
import {FormBuilderComponent} from '@client/shared/ui';
import {FormBuilderSubmitPayload} from '@client/shared/common';

@Component({
    selector: 'kr-auth-recovery-feature',
    imports: [
        FormBuilderComponent
    ],
    template: `
        @if (ready) {
            <kr-form-builder
                [formUI]="form.ui"
                (formSubmit)="onFormSubmit($event)"
            />
        } @else {
            loading...
        }`
})
export class AuthRecoveryFeature {
    @Input() form!: RecoveryFlow;
    private api = inject(AuthService);
    router = inject(Router);
    ready = true;
    error: string | undefined = undefined

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        if (data.group === "code" && data.action === "email") { // hit resend on recovery flow
            console.error("Documentation say nothing about how to do resend code:\nDocs: https://www.ory.sh/docs/kratos/reference/api#tag/frontend/operation/updateRecoveryFlow")
            return
        }
        this.ready = false;
        this.api.submitRecoveryFlow(this.form.id, data).subscribe({
            next: data => {
                this.form = data
                this.ready = true;
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = err.error;
                    this.ready = true;
                }
            },
        })
    }
}
