import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { BackendService } from 'src/app/shared/backend.service';
import { FormSettings } from '../settings/settings.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit {
    form$: Observable<any>;
    nodes_verification: Array<any>;
    form_settings: FormSettings = <FormSettings>{};
    
    constructor(
        private backend: BackendService,
        private uiService: UIService
    ) {
        this.uiService.title.next("Verification");
    }

    ngOnInit(): void {
        this.backend.createVerificationFlow().subscribe({
            next: (data: any) => {
                this.form_settings.action = data.ui.action;
                this.form_settings.method = "POST";
                this.form_settings.nodes = data.ui.nodes.filter((node:any) => node.group === "default");
                this.nodes_verification = data.ui.nodes.filter((node:any) => node.group === "code");
            }
        });;
    }
}
