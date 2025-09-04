import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {AuthService} from '@client/entities/auth';
import {filter, map, switchMap} from 'rxjs'
import {VerificationFlow} from '@ory/kratos-client';
import {FormBuilderComponent} from '@client/shared/ui';
import {AuthVerificationFeature} from '@client/features/auth';

@Component({
  selector: 'kr-verification',
    imports: [
        AuthLayout,
        AuthVerificationFeature
    ],
  template: `
      <kr-auth-layout title="Verification">
          @if (form) {
              <kr-auth-verification-feature [form]="form" />
          }
      </kr-auth-layout>
  `
})
export class Verification implements OnInit {
    activatedRoute = inject(ActivatedRoute)
    service = inject(AuthService)
    form: VerificationFlow

    ngOnInit() {
        this.activatedRoute.queryParams.pipe(
            filter(params => "flow" in params),
            map(params => params["flow"] as string),
            switchMap(flowID => {
                return this.service.verificationFlow(flowID)
            })
        ).subscribe(form=> {
            this.form = form
        })
    }
}
