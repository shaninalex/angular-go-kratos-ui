import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {
    LoginFlow,
    UiText,
    UpdateRegistrationFlowWithPasswordMethod,
} from '@ory/kratos-client';
import {catchError, filter, map, Observable, of, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService, InputBase} from '@features/auth/api';
import {KratosFormAdapter} from '@features/auth/adapters/form.adapter';
import {UiTextMessage} from '@shared/ui/components/ui-text/ui-text.message';


@Component({
    selector: 'auth-register-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        UiTextMessage,
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
        const payload: UpdateRegistrationFlowWithPasswordMethod = {
            csrf_token: this.form.get('csrf_token')?.value,
            password: this.form.get('password')?.value,
            method: "password",
            traits: {
                email: this.form.value['traits.email'],
            }
        }

        this.submitService.register(payload, this.flowID).subscribe({
            next: data => {
                console.log("Success", data)
            },
            error: err => {
                this.kForm.init(err.error.ui)
                this.form = this.kForm.formGroup;
                this.formEntries = this.kForm.formEntries;
                this.messages = this.kForm.formMessages;
                return of(err)
            }
        })
    }
}
