import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {catchError, filter, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from '@environments/environment.development';
import {OryImageComponent, OryLinkComponent, UiTextMessage} from '@shared/ui/components';
import {
    UpdateVerificationFlowWithCodeMethod,
    UpdateVerificationFlowWithCodeMethodMethodEnum,
    VerificationFlow
} from '@ory/kratos-client';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {GroupFormManager} from '@shared/adapters';
import {OryInputComponent, OryTextComponent} from '@shared/ui';

@Component({
    selector: 'auth-verification-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        UiTextMessage,
        OryInputComponent,
        OryLinkComponent,
        OryTextComponent,
        OryImageComponent
    ],
    templateUrl: 'verification-form.component.html'
})
export class VerificationFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    formWrapper: GroupFormManager = new GroupFormManager();
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
            // TODO: show angular form errors
            return;
        }

        console.log(this.form.value)
        const payload: UpdateVerificationFlowWithCodeMethod = {
            csrf_token: this.form.value["default"]["csrf_token"],
            code: this.form.value["code"]["code"],
            method: UpdateVerificationFlowWithCodeMethodMethodEnum.Code,
        }

        this.submitService.verify(payload, this.flowID).pipe(
            catchError(err => {
                this.handleError(err);
                return of(null);
            }),
            filter(data => !!data)
        ).subscribe({
            next: data => {
                this.initializeForm(data);
            },
            error: err => this.handleError(err)
        })
    }

    private handleError(err: any) {
        const flow: VerificationFlow = err?.error;
        if (flow?.ui) {
            this.initializeForm(flow);
        }
    }

    private initializeForm(flow: VerificationFlow) {
        this.formWrapper.init(flow);
        this.form = this.formWrapper.buildGroupForm();
    }
}
