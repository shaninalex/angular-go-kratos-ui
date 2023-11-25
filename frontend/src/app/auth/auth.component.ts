import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUIService } from './services/authui.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    formTitle$: Observable<string>;

    constructor(
        private uiService: AuthUIService
    ) {
        this.formTitle$ = this.uiService.formTitle;
    }
}
