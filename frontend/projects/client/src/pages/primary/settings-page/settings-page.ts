import {Component} from '@angular/core';

@Component({
    selector: 'kr-settings-page',
    imports: [],
    template: `<p>settings-page works!</p>`,
})
export class SettingsPage {
    // after successful account recovery Ory/Kratos redirect user to /settings?flow=<settings flow id> page.
    // that mean we do not need to create settings flow while accessing that page. The logic should be next:
    // - no resolver
    // - if flow exists in ActivatedRoute query params => exec getSettingsFlow(flowID)
    // - if flow NOT exists in ActivatedRoute query params => exec SettingsFlow()
}
