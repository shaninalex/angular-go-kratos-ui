import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '#root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppComponent {

    constructor() { }
}
