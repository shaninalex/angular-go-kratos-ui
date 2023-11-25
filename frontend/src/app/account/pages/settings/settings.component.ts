import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
    selector: '#page-settings',
    templateUrl: './settings.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
    form$: Observable<any>;

    constructor(
        private backend: BackendService,
        private uiService: UIService
    ) {
        this.uiService.title.next("Settings");
    }

    ngOnInit(): void {
        this.form$ = this.backend.getSettingsForm();
    }
}
