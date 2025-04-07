import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormSettings } from '../../pages/settings/settings.component';

@Component({
    selector: '[text-form]',
    templateUrl: './text-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TextFormComponent {
    @Input() form_nodes: Array<any>;
    @Input() form_settings: FormSettings;
}
