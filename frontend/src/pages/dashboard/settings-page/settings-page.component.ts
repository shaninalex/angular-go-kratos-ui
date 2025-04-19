import {Component} from '@angular/core';
import {SettingsFormComponent} from '@features/auth';

@Component({
    selector: 'settings-home',
    imports: [
        SettingsFormComponent
    ],
    template: `
        <auth-settings-form />
    `
})
export class SettingsPageComponent {
}
