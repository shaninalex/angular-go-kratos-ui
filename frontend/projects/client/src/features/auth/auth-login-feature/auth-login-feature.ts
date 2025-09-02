import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {LoginFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload} from '@client/shared/common';

@Component({
    selector: 'kr-auth-login-feature',
    imports: [FormBuilderComponent],
    template: `
    <kr-form-builder
      [formUI]="form"
      (formSubmit)="onFormSubmit($event)" />
  `
})
export class AuthLoginFeature {
    @Input() form!: LoginFlow;
    private api = inject(AuthService);

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.api.submitLoginFlow(this.form.id, data).subscribe({
            next: (res) => {
                console.log("success", res);
                // maybe emit output event to page
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = err.error; // re-render with errors
                }
            },
        });
    }
}
