import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {RegistrationFlow, SuccessfulNativeRegistration} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

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
    router = inject(Router);
    ready = true; // force rerender completely form-builder component

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.ready = false;
        this.api.submitRegistrationFlow(this.form.id, data).subscribe({
            next: (res) => {
                this.ready = true;
                if ('continue_with' in res ) {
                    const items = res.continue_with?.filter(item => item.action === "show_verification_ui")
                    if (items && items.length > 0) {
                        const url = new URL(items[0].flow.url as string)
                        this.router.navigate([url.pathname], {queryParams: {flow: url.searchParams.get("flow")}})
                    } else {
                        // TODO: handle this case
                        console.error("verification url was not provided.")
                    }
                }
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = err.error;
                }
                this.ready = true;
            },
        });
    }
}
