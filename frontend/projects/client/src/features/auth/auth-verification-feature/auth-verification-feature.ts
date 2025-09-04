import {Component, inject, Input} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {VerificationFlow} from '@ory/kratos-client';
import {Router} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {AuthService} from '@client/entities/auth';

@Component({
    selector: 'kr-auth-verification-feature',
    imports: [
        FormBuilderComponent,
    ],
    template: `
        @if (ready) {
            <kr-form-builder
                [formUI]="form"
                (formSubmit)="onFormSubmit($event)"
            />
        } @else {
            loading...
        }
    `,
})
export class AuthVerificationFeature {
    @Input() form!: VerificationFlow;
    api = inject(AuthService)
    router = inject(Router);
    ready = true; // force rerender completely form-builder component

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.ready = false;
        this.api.submitVerificationFlow(this.form.id, data).subscribe(data => {
            this.form = data
            this.ready = true;
        })
    }
}
