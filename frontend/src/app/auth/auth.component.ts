import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AuthUIService } from './services/authui.service';

@Component({
    selector: '#auth',
    templateUrl: './auth.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnDestroy {
    formTitle$: Observable<string>;
    loading: boolean;

    constructor(
        private uiService: AuthUIService
    ) {
        this.formTitle$ = this.uiService.formTitle;
        this.uiService.loading.subscribe({
            next: data => this.loading = data
        });
    }

    ngOnDestroy(): void {
        this.uiService.loading.unsubscribe()
    }
}
