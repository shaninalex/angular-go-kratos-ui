import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/shared/backend.service';
import { UIService } from 'src/app/shared/ui.service';

export interface FormSettings {
    action: string
    method: string
    nodes: Array<any>
}

@Component({
    selector: '#page-settings',
    templateUrl: './settings.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SettingsComponent implements OnInit {
    form$: Observable<any>;
    active_tab: string = "totp";
    nodes_profile: Array<any>;
    nodes_password: Array<any>;
    nodes_totp: Array<any>;
    form_settings: FormSettings = <FormSettings>{};

    constructor(
        private backend: BackendService,
        private uiService: UIService
    ) {
        this.uiService.title.next("Settings");
    }

    ngOnInit(): void {
        // this.form$ = 
        this.backend.getSettingsForm().subscribe({
            next: (data: any) => {
                this.form_settings.action = data.ui.action;
                this.form_settings.method = "POST";
                this.form_settings.nodes = data.ui.nodes.filter((node:any) => node.group === "default");
                this.nodes_profile = data.ui.nodes.filter((node:any) => node.group === "profile");
                this.nodes_password = data.ui.nodes.filter((node:any) => node.group === "password");
                this.nodes_totp = data.ui.nodes.filter((node:any) => node.group === "totp" || node.group === "lookup_secret");
            }
        });
    }

    changeTab(tab_name: string): void {
        this.active_tab = tab_name
    }
}
