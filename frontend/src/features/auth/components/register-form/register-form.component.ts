import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {
    LoginFlow,
    UiText,
    UpdateRegistrationFlowWithPasswordMethod,
    UpdateRegistrationFlowWithProfileMethod
} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService, InputBase} from '@features/auth/api';
import {KratosFormAdapter} from '@features/auth/adapters/form.adapter';


@Component({
    selector: 'auth-register-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
    ],
    providers: [AuthFormService, AuthSubmitService, AuthSubmitService],
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    messages: UiText[] = [];
    formEntries: InputBase[] = [];
    form: FormGroup = new FormGroup({});
    kForm: KratosFormAdapter = new KratosFormAdapter();

    registerFlow$: Observable<LoginFlow> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_REGISTRATION_REDIRECT;
                return null;
            }
            this.flowID = params["flow"];
            return params["flow"];
        }),
        filter((flowId): flowId is string => flowId !== null),
        switchMap((flowId: string) => this.authService.GetRegistrationForm(flowId)),
        tap((data: LoginFlow) => {
            this.kForm.init(data.ui)
            this.form = this.kForm.formGroup;
            this.formEntries = this.kForm.formEntries;
            this.messages = this.kForm.formMessages;
        })
    );

    onSubmit(): void {
        if (!this.form.valid) {
            console.log(this.form);
            return;
        }

        const payload: UpdateRegistrationFlowWithProfileMethod = {
            csrf_token: this.form.get('csrf_token')?.value,
            method: "profile",
            screen: "credential-selection",
            traits: {
                email: this.form.value['traits.email'],
                name: {
                    first: this.form.value['traits.name.first'],
                    last: this.form.value['traits.name.last'],
                }
            }
        }
        this.submitService.register(payload, this.flowID).subscribe({
            next: data => {
                if (data.data.ui.messages) {
                    this.kForm.formMessages = data.data.ui.messages;
                }
            },
            error: data => {
                if (data.error.ui.messages) {
                    this.kForm.formMessages = data.error.ui.messages;
                }
            }
        })
    }
}
