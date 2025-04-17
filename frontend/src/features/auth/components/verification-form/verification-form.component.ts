import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {
    UiText,
    UpdateVerificationFlowWithCodeMethod,
    UpdateVerificationFlowWithCodeMethodMethodEnum,
    VerificationFlow
} from '@ory/kratos-client';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {environment} from '@environments/environment.development';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {UiTextMessage} from '@shared/ui/components/ui-text/ui-text.message';
import {OryFormAdapter} from '@shared/adapters';
import {OryInputComponent, OryTextComponent} from '@shared/ui';
import {OryLinkComponent} from '@shared/ui/components/ory-link/ory-link.component';

@Component({
    selector: 'auth-verification-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        UiTextMessage,
        JsonPipe,
        OryInputComponent,
        OryLinkComponent,
        OryTextComponent
    ],
    templateUrl: 'verification-form.component.html'
})
export class VerificationFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    formWrapper: OryFormAdapter = new OryFormAdapter();
    form: FormGroup = new FormGroup({});

    flow$: Observable<VerificationFlow> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_REGISTRATION_REDIRECT;
                return null;
            }
            this.flowID = params["flow"];
            return params["flow"];
        }),
        filter((flowId): flowId is string => flowId !== null),
        switchMap((flowId: string) => this.authService.GetVerificationForm(flowId)),
        tap((data: VerificationFlow) => this.initializeForm(data))
    );


    onSubmit(): void {
        if (!this.form.valid) {
            console.log(this.form.value)
            console.log(this.form);
            return;
        }
        console.log(this.form.value)

        const payload: UpdateVerificationFlowWithCodeMethod = {
            csrf_token: this.form.get('csrf_token')?.value,
            code: this.form.get('code')?.value,
            method: UpdateVerificationFlowWithCodeMethodMethodEnum.Code,
        }

        this.submitService.verify(payload, this.flowID).subscribe({
            next: data => {
                console.log(data)
            },
            error: err => {
                console.log(err.error)
            }
        })
    }

    private initializeForm(flow: VerificationFlow) {
        this.formWrapper.init(flow);
        this.form = this.formWrapper.form();
    }
}
