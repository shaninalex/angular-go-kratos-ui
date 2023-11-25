import { Component, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralError } from '../../typedefs';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent {
    error$: Observable<GeneralError>;

    constructor(
        private backend: BackendService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe({
            next: (data: any) => {
                if (data.hasOwnProperty("id")) {
                    this.error$ = this.backend.getError(data.id);
                }
            }
        })
    }
}
