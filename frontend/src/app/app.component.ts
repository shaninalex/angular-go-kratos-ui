import { Component, ContentChild } from '@angular/core';
import { AccountService } from './shared/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private account: AccountService) {
        this.account.getSessionInformation().subscribe({
            next: data => {
                console.log(data);
            }
        })
    }
}
