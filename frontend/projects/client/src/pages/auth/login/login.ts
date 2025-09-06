import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {AuthLoginFeature} from '@client/features/auth';
import {AuthService} from '@client/entities/auth';
import {LoginFlow} from '@ory/kratos-client';
import {withGenericErrorHandling} from '@client/shared/common';
import {distinctUntilChanged, map} from 'rxjs';

@Component({
    selector: 'kr-login',
    imports: [AuthLayout, RouterLink, AuthLoginFeature],
    template: `
        <kr-auth-layout title="Login">
            @if (form) {
                <kr-auth-login-feature [form]="form"/>
            }
            Don't have an account? <a [routerLink]="['/auth/registration']" class="underline">Registration</a><br/>
            Forgot password? <a [routerLink]="['/auth/recovery']" class="underline">Recovery</a>
        </kr-auth-layout>
    `
})
export class Login implements OnInit {
    private service = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    form?: LoginFlow;

    ngOnInit() {
        this.route.queryParamMap.pipe(
            map(params => params.get('aal')),
            distinctUntilChanged(),
        ).subscribe(aal => this.loadLoginFlow(aal));
    }

    private loadLoginFlow(aal: string | null) {
        this.service.loginFlow(aal).pipe(
            withGenericErrorHandling({
                session_already_available: () => this.router.navigate(['/']),
                session_aal2_required: () => this.router.navigate(['/auth/login'], {queryParams: {aal: "aal2"}})
            })
        ).subscribe({
            next: (flow) => {
                if (flow) {
                    this.form = flow;
                }
            },
            error: () => {
                console.warn('Login flow failed');
            }
        });
    }
}
