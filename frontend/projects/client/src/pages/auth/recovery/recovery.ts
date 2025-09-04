import {Component, inject} from '@angular/core';
import {AuthLayout} from '@client/shared/layouts';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthRecoveryFeature} from '@client/features/auth/auth-recovery-feature/auth-recovery-feature';

@Component({
    selector: 'kr-recovery',
    imports: [
        AuthLayout,
        AuthRecoveryFeature,
        RouterLink,
    ],
    template: `
        <kr-auth-layout title="Recovery">
            <kr-auth-recovery-feature [form]="form" />
            <a [routerLink]="['/auth/login']" class="underline">Login</a> instead.
        </kr-auth-layout>
    `,
})
export class Recovery {
    activatedRoute = inject(ActivatedRoute)
    form = this.activatedRoute.snapshot.data['form']
}
