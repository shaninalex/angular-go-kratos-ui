import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from '../../../shared/ui.service';
import { BackendService } from 'src/app/shared/backend.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: '#register',
    template: `
    <generated-from [form]="form$" />
    <hr />
    Already have an account? <a routerLink="/auth/login">Login</a>
  `,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class RegisterComponent implements OnInit {
    form$: Observable<any>; // TODO: Types for registration form

    constructor(
        private auth: BackendService,
        private route: ActivatedRoute,
        private uiService: UIService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: params => {
                this.uiService.title.next("Register");
                this.form$ = this.auth.getRegistrationFlow(params["flow"]);
            }
        })
    }
}
