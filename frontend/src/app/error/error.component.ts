import { Component, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralError } from 'src/app/typedefs/error';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
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
