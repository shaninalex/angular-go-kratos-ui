import {Component, inject} from '@angular/core';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {map, Observable} from 'rxjs';
import {SettingsFlow} from '@ory/kratos-client';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
    OryInputComponent,
    OryImageComponent,
    OryTextComponent, OryLinkComponent,
} from '@shared/ui';
import {AsyncPipe, NgClass} from '@angular/common';
import {GroupFormManager} from '@shared/adapters';

@Component({
    selector: 'auth-settings-form',
    imports: [
        ReactiveFormsModule,
        AsyncPipe,
        OryImageComponent,
        OryTextComponent,
        NgClass,
        OryInputComponent,
        OryLinkComponent,
    ],
    templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
    activeGroup: string = 'profile'
    formService: AuthFormService = inject(AuthFormService)
    formWrapper: GroupFormManager = new GroupFormManager();
    form: FormGroup = new FormGroup({});
    private submitService: AuthSubmitService = inject(AuthSubmitService)

    flow$: Observable<SettingsFlow> = this.formService.GetSettingsForm().pipe(
        map(data => {
            this.initForm(data)
            return data
        })
    );

    initForm(data: SettingsFlow): void {
        this.formWrapper.init(data);
        this.form = this.formWrapper.buildGroupForm();
    }

    onSubmit() {
        this.submitService.updateSettings(this.form.value, this.activeGroup);
    }

    changeGroup(group: string) {
        this.activeGroup = group
    }
}
