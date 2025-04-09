import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService, FormControlService, InputBase} from '@features/auth/api';


@Component({
    selector: 'auth-login-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
    ],
    providers: [AuthFormService, FormControlService, AuthSubmitService, AuthSubmitService],
    template: `
        @if (loginFlow$ | async; as loginFlow) {
            <form [formGroup]="form" (submit)="onSubmit()" class="flex flex-col gap-4">
                @for (input of formEntries; track $index) {
                    @switch (input.controlType) {
                        @case ('hidden') {
                            <input [formControlName]="input.name"
                                   [type]="input.controlType"
                                   [id]="input.name"
                            />
                        }
                        @case ('submit') {
                            <div>
                                <input class="btn"
                                       [formControlName]="input.name"
                                       [type]="input.controlType"
                                       [id]="input.name"
                                />
                            </div>
                        }
                        @default {
                            <div>
                                <input class="input"
                                       [formControlName]="input.name"
                                       [type]="input.controlType"
                                       [id]="input.name"
                                       [placeholder]="input.placeholder"
                                />
                                @if (form.get(input.name)?.errors && form.get(input.name)?.dirty) {
                                    <div class="text-red-500 text-sm">
                                        This field is required.
                                    </div>
                                }
                            </div>
                        }
                    }
                }
            </form>
        } @else {
            loading...
        }`
})
export class LoginFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private formService: FormControlService = inject(FormControlService)
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    formEntries: InputBase[] = [];
    form: FormGroup = new FormGroup({});

    loginFlow$: Observable<LoginFlow> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_LOGIN_REDIRECT;
                return null;
            }
            this.flowID = params["flow"];
            return params["flow"];
        }),
        filter((flowId): flowId is string => flowId !== null),
        switchMap((flowId: string) => this.authService.GetLoginForm(flowId)),
        tap((data: LoginFlow) => {
            this.form = this.formService.toFormGroup(data.ui);
            this.formEntries = this.formService.toFormInputs(data.ui);
        })
    );

    onSubmit(): void {
        if (!this.form.valid) {
            console.log(this.form);
            return;
        }
        const payload = {
            csrf_token: this.form.get('csrf_token')?.value,
            identifier: this.form.get('identifier')?.value,
            method: 'password',
            password: this.form.get('password')?.value,
        }
        this.submitService.login(payload, this.flowID).subscribe(data => {
            console.log(data);
        })
    }
}
