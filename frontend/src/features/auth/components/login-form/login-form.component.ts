import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {AuthFormService} from '@features/auth/api/auth-api.service';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormControlService} from '@features/auth/api/form-control.service';
import {InputBase} from '@features/auth/api/interfaces';


@Component({
    selector: 'auth-login-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
    ],
    providers: [AuthFormService, FormControlService],
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
    private authService: AuthFormService = inject(AuthFormService);
    private formService: FormControlService = inject(FormControlService)

    formEntries: InputBase[] = [];
    form: FormGroup = new FormGroup({});

    loginFlow$: Observable<LoginFlow> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_LOGIN_REDIRECT;
                return null;
            }
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
            console.warn("Form invalid", this.form.errors);
            return;
        }

        console.log("Submitting:", this.form.value);
    }
}
