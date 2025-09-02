import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {RegistrationFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload} from '@client/shared/common';

@Component({
    selector: 'kr-auth-registration-feature',
    imports: [FormBuilderComponent],
    template: `
        @if (ready) {
            <kr-form-builder
                [formUI]="form"
                (formSubmit)="onFormSubmit($event)"
            />
        } @else {
            loading...
        }
  `
})
export class AuthRegistrationFeature {
    @Input() form!: RegistrationFlow;
    private api = inject(AuthService);
    ready = true; // force rerender completely form-builder component

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.ready = false;
        this.api.submitRegistrationFlow(this.form.id, data).subscribe({
            next: (res) => {
                this.ready = true;
                console.log("success", res);
                // TODO: handle SuccessfulNativeRegistration type
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = { ...err.error };
                }
                this.ready = true;
            },
        });
    }
}
