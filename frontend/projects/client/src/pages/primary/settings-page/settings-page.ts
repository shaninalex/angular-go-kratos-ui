import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {UserSettingsFeature} from '@client/features/user';
import {AsyncPipe} from '@angular/common';
import {SettingsFlow} from '@ory/kratos-client';
import {UserService} from '@client/entities/user';

@Component({
    selector: 'kr-settings-page',
    imports: [
        UserSettingsFeature,
        AsyncPipe
    ],
    template: `
        @if (form|async; as form) {
            <kr-user-settings-feature [form]="form" />
        }
    `,
})
export class SettingsPage {
    route = inject(ActivatedRoute);
    api = inject(UserService);
    form: Observable<SettingsFlow> = this.route.queryParams.pipe(
        switchMap(params => this.api.settingsFlow(params["flow"]))
    );
}
