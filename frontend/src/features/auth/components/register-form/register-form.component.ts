import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
    ContinueWithVerificationUi,
    ContinueWithVerificationUiActionEnum,
    RegistrationFlow,
    SuccessfulNativeRegistration,
    UpdateRegistrationFlowWithPasswordMethod,
} from '@ory/kratos-client';
import {catchError, filter, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from '@environments/environment.development';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {OryImageComponent, OryLinkComponent, UiTextMessage} from '@shared/ui/components';
import {GroupFormManager} from '@shared/adapters';
import {OryInputComponent, OryTextComponent} from '@shared/ui';


@Component({
    selector: 'auth-register-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        UiTextMessage,
        OryInputComponent,
        OryTextComponent,
        OryImageComponent,
        OryLinkComponent,
    ],
    providers: [AuthFormService, AuthSubmitService, AuthSubmitService],
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    formWrapper: GroupFormManager = new GroupFormManager();
    form: FormGroup = new FormGroup({});

    flow$: Observable<RegistrationFlow> = this.route.queryParams.pipe(
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
        tap((data: RegistrationFlow) => this.initializeForm(data))
    );

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }

        const payload: UpdateRegistrationFlowWithPasswordMethod = {
            csrf_token: this.form.value["default"]["csrf_token"],
            password: this.form.value["password"]["password"],
            method: "password",
            traits: {
                email: this.form.value["password"]['traits.email'],
            }
        }

        this.submitService.register(payload, this.flowID).pipe(
            catchError(err => {
                this.handleError(err);
                return of(null);
            }),
            filter(data => !!data)
        ).subscribe(data => {
            this.handleSuccess(data);
        });
    }

    private handleSuccess(data: SuccessfulNativeRegistration) {
        const continueWith = data?.continue_with ?? [];
        const showVerification = continueWith.find(
            c => c.action === ContinueWithVerificationUiActionEnum.ShowVerificationUi
        ) as ContinueWithVerificationUi;
        if (showVerification?.flow?.id) {
            this.router.navigate(['auth', 'verification'], {
                queryParams: { flow: showVerification.flow.id }
            });
        }
    }

    private handleError(err: any) {
        const flow: RegistrationFlow = err?.error;
        if (flow?.ui) {
            this.initializeForm(flow);
        } else {
            // this.formWrapper.messages = [{ id: 0, type: 'error', text: 'Unexpected error occurred' }];
        }
    }

    private initializeForm(flow: RegistrationFlow) {
        this.formWrapper.init(flow);
        this.form = this.formWrapper.buildGroupForm();
    }
}
