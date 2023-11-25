import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap} from 'rxjs';
import { AuthUIService } from '../../services/authui.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  encapsulation: ViewEncapsulation.None
})
export class VerificationComponent {
    form$: Observable<any>;
    flow: string;

    constructor(
        private auth: AuthService, 
        private route: ActivatedRoute,
        private uiService: AuthUIService,
    ) {
        this.uiService.formTitle.next("Verification");
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(data => {
            this.flow = data["flow"];
            this.form$ = this.auth.formGetVerification(this.flow).pipe(
                tap(data => {
                    data.ui.messages.map((item:any) => {
                        console.log({severity: item.type, detail: item.text })
                    });
                })
            );
        });
    }
}
