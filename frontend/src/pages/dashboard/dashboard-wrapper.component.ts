import {Component} from '@angular/core';
import {DashboardLayoutComponent} from '@app/layout';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-dashboard-wrapper',
    imports: [
        DashboardLayoutComponent,
        RouterOutlet
    ],
    template: `
        <layout-dashboard>
            <router-outlet/>
        </layout-dashboard>
    `
})
export class DashboardWrapperComponent {}
