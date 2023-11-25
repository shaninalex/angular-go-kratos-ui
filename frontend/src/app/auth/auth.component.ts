import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUIService } from './services/authui.service';

@Component({
    selector: '#auth',
    templateUrl: './auth.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
    formTitle$: Observable<string>;

    constructor(
        private uiService: AuthUIService
    ) {
        this.formTitle$ = this.uiService.formTitle;
    }
}
