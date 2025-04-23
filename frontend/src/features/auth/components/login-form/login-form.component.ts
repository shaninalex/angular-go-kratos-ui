import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LoginFlow, UpdateLoginFlowBody, UpdateSettingsFlowWithOidcMethod} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {OryImageComponent, OryInputComponent, OryLinkComponent, OryTextComponent} from "@shared/ui";
import {UiTextMessage} from "@shared/ui/components/ui-text/ui-text.message";
import {GroupFormManager, TGroup} from '@shared/adapters';


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
    private isOidc: boolean = false;
    private provider: string = "";

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

    processOIDC(v: string) {
        this.isOidc = true
        this.provider = v
    }

    onSubmit(): void {
        let payload = {}
        if (!this.isOidc) {
            if (!this.form.valid) {
                console.log(this.form.value)
                return;
            }
            payload = {
                csrf_token: this.form.value["default"]["csrf_token"],
                identifier: this.form.value["default"]["identifier"],
                method: 'password',
                password: this.form.value["password"]["password"],
            }
        } else if (this.isOidc) {
            payload = {
                csrf_token: this.form.value["default"]["csrf_token"],
                method: 'oidc',
                provider: this.provider,
            };
        }

        this.submitService.login(payload as UpdateLoginFlowBody, this.flowID).subscribe({
            next: data => {
                this.router.navigate(['/'])
            },
            error: err => {
                if (err.status === 422 && this.isOidc && this.provider !== "") {
                    if ( err.error.redirect_browser_to ) {
                        window.location.href = err.error.redirect_browser_to
                    }
                    return
                }
                this.formWrapper.init(err.error)
                this.form = this.formWrapper.buildGroupForm();
            }
        })
    }
}

