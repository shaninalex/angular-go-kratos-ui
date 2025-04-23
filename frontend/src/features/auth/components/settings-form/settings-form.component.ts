import {Component, inject} from '@angular/core';
import {AuthFormService, AuthSubmitService} from '@features/auth/api';
import {map, Observable} from 'rxjs';
import {SettingsFlow} from '@ory/kratos-client';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
    OryInputComponent,
    OryImageComponent,
    OryTextComponent, OryLinkComponent, UiTextMessage,
} from '@shared/ui';
import {AsyncPipe, NgClass} from '@angular/common';
import {GroupFormManager, TGroup} from '@shared/adapters';


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
        UiTextMessage,
    ],
    templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {
    activeGroup: TGroup = "profile"
    flowId: string = ''
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
        this.flowId = data.id
    }

    onSubmit() {
        this.submitService.updateSettings(this.form.value, this.activeGroup, this.flowId).subscribe({
            next: data => this.initForm(data),
            error: err => this.initForm(err.error),
        });
    }

    changeGroup(group: string) {
        this.activeGroup = group as TGroup
    }
}
