import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormSettings } from '../../settings.component';

@Component({
    selector: '#form-profile',
    templateUrl: './form-profile.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormProfileComponent {
    @Input() form_nodes: Array<any>;
    @Input() form_settings: FormSettings;
}
