import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormSettings } from '../../settings.component';

@Component({
    selector: '#form-password',
    templateUrl: './form-password.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormPasswordComponent {
    @Input() form_nodes: Array<any>;
    @Input() form_settings: FormSettings;
}
