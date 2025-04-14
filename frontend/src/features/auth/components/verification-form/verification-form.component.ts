import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthFormService, AuthSubmitService, InputBase} from '@features/auth/api';
import {UiText, VerificationFlow} from '@ory/kratos-client';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {KratosFormAdapter} from '@features/auth/adapters/form.adapter';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {environment} from '@environments/environment.development';
import {AsyncPipe} from '@angular/common';
import {UiTextMessage} from '@shared/ui/components/ui-text/ui-text.message';

@Component({
    selector: 'auth-verification-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        UiTextMessage
    ],
    templateUrl: 'verification-form.component.html'
})
export class VerificationFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    messages: UiText[] = [];
    formEntries: InputBase[] = [];
    form: FormGroup = new FormGroup({});
    kForm: KratosFormAdapter = new KratosFormAdapter();

    verificationFlow$: Observable<VerificationFlow> = this.route.queryParams.pipe(
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
            console.log(this.form);
            return;
        }
        console.log(this.form.value)
    }

    private initializeForm(flow: VerificationFlow) {
        this.kForm.init(flow.ui);
        this.form = this.kForm.formGroup;
        this.formEntries = this.kForm.formEntries;
        this.messages = this.kForm.formMessages;
    }
}
