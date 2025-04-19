import {Component, inject} from '@angular/core';
import {AuthFormService} from '@features/auth/api';
import {map, Observable} from 'rxjs';
import {SettingsFlow} from '@ory/kratos-client';
import {OryFormAdapter} from '@shared/adapters';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OryInputComponent, UiTextMessage, OryImageComponent} from '@shared/ui';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'auth-settings-form',
    imports: [
        ReactiveFormsModule,
        OryInputComponent,
        UiTextMessage,
        AsyncPipe,
        OryImageComponent
    ],
    templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
    formService: AuthFormService = inject(AuthFormService)
    formWrapper: OryFormAdapter = new OryFormAdapter();
    form: FormGroup = new FormGroup({});
    flow$: Observable<SettingsFlow> = this.formService.GetSettingsForm().pipe(
        map(data => {
            this.initForm(data)
            return data
        })
    );

    initForm(data: SettingsFlow): void {
        this.formWrapper.init(data);
        this.form = this.formWrapper.form();
    }

    onSubmit() {

    }
}
