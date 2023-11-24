import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    form$: Observable<any>;

    constructor(private backend: BackendService) {

    }

    ngOnInit(): void {
        this.form$ = this.backend.getSettingsForm();
    }

}
