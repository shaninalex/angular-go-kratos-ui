import { Component, ViewEncapsulation } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap} from 'rxjs';
import { UIService } from '../../../shared/ui.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  encapsulation: ViewEncapsulation.None
})
export class VerificationComponent {
    form$: Observable<any>;
    flow: string;

    constructor(
        private auth: BackendService, 
        private route: ActivatedRoute,
        private uiService: UIService,
    ) {
        this.uiService.title.next("Verification");
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
