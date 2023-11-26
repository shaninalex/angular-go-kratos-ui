import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Observable, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from '../../../shared/ui.service';


@Component({
    selector: '#form-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    form$: Observable<any>;

    constructor(
        private auth: BackendService,
        private router: Router,
        private route: ActivatedRoute,
        private uiService: UIService
    ) {
        this.uiService.title.next("Login");
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe({
                next: params => {
                    this.form$ = this.auth.getLoginFlow(params["flow"]).pipe(
                        catchError(error => {
                            if (error.status == 410) {
                                // From can be expired and server will return "410 Gone"
                                console.log("Form is expired");
                            }
                            return this.router.navigate(["/auth/login"]);
                        })
                    );
            }
        })
    }
}
