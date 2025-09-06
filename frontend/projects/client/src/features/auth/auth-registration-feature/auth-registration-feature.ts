import {Component, inject, Input} from '@angular/core';
import {ContinueWithComponent, FormBuilderComponent} from '@client/shared/ui';
import {ContinueWith, RegistrationFlow, SuccessfulNativeRegistration} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'kr-auth-registration-feature',
    imports: [FormBuilderComponent, ContinueWithComponent],
    template: `
        @if (continueWith) {
            <kr-continue-with [continueWith]="continueWith" />
        } @else {
            <kr-form-builder
                [formUI]="form.ui"
                (formSubmit)="onFormSubmit($event)"
            />
        }
  `
})
export class AuthRegistrationFeature {
    @Input() form!: RegistrationFlow;
    private api = inject(AuthService);
    router = inject(Router);
    continueWith: ContinueWith[] | undefined;

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.api.submitRegistrationFlow(this.form.id, data).subscribe({
            next: (res) => {
                if ('continue_with' in res ) {
                    this.continueWith = res.continue_with
                }
            },
            error: (err) => {
                if (err.error.error.id === "browser_location_change_required") {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = err.error;
                }
            },
        });
    }
}
