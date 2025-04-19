import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {environment} from '@environments/environment.development';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {OryInputComponent, OryTextComponent} from "@shared/ui";
import {UiTextMessage} from "@shared/ui/components/ui-text/ui-text.message";
import {OryFormManager} from '@shared/adapters';
import {Store} from '@ngrx/store';
import {AppState} from '@shared/store';


@Component({
    selector: 'auth-login-form',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        JsonPipe,
        OryInputComponent,
        UiTextMessage,
        OryTextComponent,
    ],
    providers: [AuthFormService, AuthSubmitService, AuthSubmitService],
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private flowID: string
    private authService: AuthFormService = inject(AuthFormService);
    private submitService: AuthSubmitService = inject(AuthSubmitService)
    private store: Store<AppState> = inject(Store<AppState>);
    private router: Router = inject(Router);

    formWrapper: OryFormManager = new OryFormManager()
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
            this.form = this.formWrapper.getForm();
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
        this.submitService.login(payload, this.flowID).subscribe({
            next: data => {
                this.router.navigate(['/'])
            },
            error: data => {
                if (data.error.ui.messages) {
                    this.formWrapper.messages = data.error.ui.messages;
                }
            }
        })
    }
}
