import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Component({
    selector: '#auth',
    templateUrl: './auth.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnDestroy {
    formTitle$: Observable<string>;
    loading: boolean;

    constructor(
        private uiService: UIService
    ) {
        this.formTitle$ = this.uiService.title;
        this.uiService.loading.subscribe({
            next: data => this.loading = data
        });
    }

    ngOnDestroy(): void {
        this.uiService.loading.unsubscribe()
    }
}
