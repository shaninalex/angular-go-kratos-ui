import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {LoginFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {Router} from '@angular/router';

@Component({
    selector: 'kr-auth-login-feature',
    imports: [FormBuilderComponent],
    template: `
        <kr-form-builder
            [formUI]="form"
            (formSubmit)="onFormSubmit($event)"/>
    `
})
export class AuthLoginFeature {
    @Input() form!: LoginFlow;
    router = inject(Router)
    private api = inject(AuthService);

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.api.submitLoginFlow(this.form.id, data).subscribe({
            next: (res) => {
                if ('continue_with' in res) {
                    const items = res.continue_with?.filter(item => item.action === "redirect_browser_to")
                    if (items && items.length > 0) {
                        const url = new URL(items[0].redirect_browser_to as string)
                        this.router.navigate([url.pathname], {queryParams: {flow: url.searchParams.get("flow")}})
                    }
                }
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
