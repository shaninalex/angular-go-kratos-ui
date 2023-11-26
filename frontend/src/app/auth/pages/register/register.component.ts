import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { UIService } from '../../../shared/ui.service';
import { BackendService } from 'src/app/shared/backend.service';


@Component({
  selector: '#register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    form$: Observable<any>; // TODO: Types for registration form

    constructor(
        private auth: BackendService,
        private uiService: UIService
    ) {
        this.uiService.title.next("Register");
    }

    ngOnInit(): void {
        this.form$ = this.auth.getRegistrationFlow().pipe(
            finalize(() => this.uiService.loading.next(false))
        )
    }
}
