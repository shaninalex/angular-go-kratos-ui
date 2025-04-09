import {Component} from '@angular/core';

@Component({
    selector: 'layout-auth',
    imports: [],
    template: `
        <div class="flex items-center justify-center h-screen p-4">
            <div class="border rounded p-4">
                <ng-content/>
            </div>
        </div>
    `,
})
export class AuthLayoutComponent {

}

