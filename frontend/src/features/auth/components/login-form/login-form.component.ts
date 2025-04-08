import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {AuthService} from '../../api/auth-api.service';
import {environment} from '@environments/environment.development';
import {ApiResponse} from '@shared/api';
import {OryInputComponent} from '@shared/ui';

@Component({
    selector: 'auth-login-form',
    imports: [
        AsyncPipe,
        OryInputComponent,
    ],
    providers: [AuthService],
    template: `
        @if (loginFlow$ | async; as loginFlow) {
            <form [action]="loginFlow.ui.action" method="post" class="flex flex-col gap-4">
                @for (node of loginFlow.ui.nodes; track node) {
                    <ory-input [node]="node"/>
                }
            </form>
        } @else {
            loading...
        }`
})
export class LoginFormComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private authService: AuthService = inject(AuthService);

    loginFlow$: Observable<LoginFlow> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_LOGIN_REDIRECT;
                return null;
            }
            return params["flow"];
        }),
        filter((flowId) => flowId !== null),
        switchMap((flowId: string) => this.authService.GetLoginForm(flowId).pipe(
            map((data: LoginFlow) => data)
        ))
    );
}
