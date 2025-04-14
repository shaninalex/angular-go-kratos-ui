import {Component} from '@angular/core';
import {VerificationFormComponent} from '@features/auth/components/verification-form/verification-form.component';

@Component({
    selector: 'app-verify-page',
    imports: [
        VerificationFormComponent
    ],
    template: `
        <p>
            verify-page works!
        </p>
        <auth-verification-form />
    `
})
export class VerifyPageComponent {

}
