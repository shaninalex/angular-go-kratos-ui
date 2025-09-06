import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {LoginFlow} from '@ory/kratos-client';
import {AuthService, SetSessionAction} from '@client/entities/auth';
import {AppState, FormBuilderSubmitPayload} from '@client/shared/common';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
    selector: 'kr-auth-login-feature',
    imports: [FormBuilderComponent],
    template: `
        <kr-form-builder
            [formUI]="form.ui"
            (formSubmit)="onFormSubmit($event)"/>
    `
})
export class AuthLoginFeature {
    @Input() form!: LoginFlow;
    private router = inject(Router)
    private store = inject(Store<AppState>)
    private api = inject(AuthService);

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.api.submitLoginFlow(this.form.id, data).subscribe({
            next: (res) => {
                if ("session" in res) {
                    this.store.dispatch(SetSessionAction({ session: res.session }))
                    this.router.navigate(['/'])
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
