import {Component} from '@angular/core';
import {VerificationFormComponent} from '@features/auth';

@Component({
    selector: 'app-verify-page',
    imports: [
        VerificationFormComponent
    ],
    template: `
        <auth-verification-form/>
    `
})
export class VerifyPageComponent {
}
