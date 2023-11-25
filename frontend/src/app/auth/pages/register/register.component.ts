import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, finalize } from 'rxjs';
import { UIService } from '../../../shared/ui.service';


@Component({
  selector: '#register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    form$: Observable<any>; // TODO: Types for registration form

    constructor(
        private route: ActivatedRoute,
        private auth: AuthService,
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
