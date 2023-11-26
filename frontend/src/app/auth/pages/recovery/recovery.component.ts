import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
    form$: Observable<any>;

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private uiService: UIService
    ) {
        this.uiService.title.next("Recover");
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe({
                next: params => {
                    this.form$ = this.auth.getRecoveryFlow(params["flow"]).pipe(
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
