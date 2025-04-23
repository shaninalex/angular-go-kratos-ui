import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {OryImageComponent, OryInputComponent, OryLinkComponent, OryTextComponent} from "@shared/ui";
import {UiTextMessage} from "@shared/ui/components/ui-text/ui-text.message";
import {GroupFormManager} from '@shared/adapters';


@Component({
    selector: 'auth-login-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        OryInputComponent,
        UiTextMessage,
        OryTextComponent,
        OryImageComponent,
        OryLinkComponent,
    ],
    providers: [AuthFormService, AuthSubmitService, AuthSubmitService],
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)
    private router: Router = inject(Router);

    formWrapper: GroupFormManager = new GroupFormManager()
    form: FormGroup = new FormGroup({});

    flow$: Observable<LoginFlow> = this.route.queryParams.pipe(
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
            this.formWrapper.init(data)
            this.form = this.formWrapper.buildGroupForm();
        })
    );

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }

        // TODO: totp
        // TODO: create payload based on form type or login method
        const payload = {
            csrf_token: this.form.value["default"]["csrf_token"],
            identifier: this.form.value["default"]["identifier"],
            method: 'password',
            password: this.form.value["password"]["password"],
        }
        this.submitService.login(payload, this.flowID).subscribe({
            next: data => {
                this.router.navigate(['/'])
            },
            error: err => {
                this.formWrapper.init(err.error)
                this.form = this.formWrapper.buildGroupForm();
            }
        })
    }
}

