import { Component } from '@angular/core';
import { UIService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(
        private uiService: UIService
    ) {
        this.uiService.title.next("Home");
    }
}
