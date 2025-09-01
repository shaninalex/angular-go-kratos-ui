import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthLayout} from '@client/shared/layouts/auth-layout/auth-layout';
import {FormBuilderComponent} from '@client/features/auth';

@Component({
  selector: 'kr-verification',
    imports: [
        AuthLayout,
        FormBuilderComponent
    ],
  template: `
      <kr-auth-layout title="Verification" [ready]="!!form">
          <kr-form-builder [formUI]="form"  (formSubmit)="onFormSubmit($event)"/>
      </kr-auth-layout>
  `
})
export class Verification {
    activatedRoute = inject(ActivatedRoute)
    form = this.activatedRoute.snapshot.data['form']

    onFormSubmit(data: any): void {
        console.log(data)
    }
}
