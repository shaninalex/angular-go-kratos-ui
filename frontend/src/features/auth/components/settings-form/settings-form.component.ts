import {Component, inject} from '@angular/core';
import {AuthFormService} from '@features/auth/api';
import {map, Observable} from 'rxjs';
import {SettingsFlow} from '@ory/kratos-client';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
    OryInputComponent,
    UiTextMessage,
    OryImageComponent,
    OryTextComponent,
    OryLinkComponent,
    KeysPipe
} from '@shared/ui';
import {AsyncPipe, NgClass} from '@angular/common';
import {OryFormManager} from '@shared/adapters/ory/form.manager';

@Component({
    selector: 'auth-settings-form',
    imports: [
        ReactiveFormsModule,
        OryInputComponent,
        UiTextMessage,
        AsyncPipe,
        OryImageComponent,
        OryTextComponent,
        OryLinkComponent,
        NgClass,
    ],
    templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
    activeTab: string = 'profile'
    formService: AuthFormService = inject(AuthFormService)
    formWrapper: OryFormManager = new OryFormManager();
    form: FormGroup = new FormGroup({});
    flow$: Observable<SettingsFlow> = this.formService.GetSettingsForm().pipe(
        map(data => {
            this.initForm(data)
            return data
        })
    );

    initForm(data: SettingsFlow): void {
        this.formWrapper.init(data);
        this.form = this.formWrapper.getGroupForm(this.activeTab);
    }

    onSubmit() { }

    changeTab(group: string) {
        this.activeTab = group
        this.form = this.formWrapper.getGroupForm(this.activeTab);
    }
}
