import { Component } from '@angular/core';
import {NavbarComponent} from '@app/layout/dashboard/components';

@Component({
    selector: 'layout-dashboard',
    imports: [
        NavbarComponent
    ],
    template: `
        <div class="w-4xl mx-auto">
            <navbar/>
            <ng-content/>
        </div>
    `,
})
export class DashboardLayoutComponent {

}
