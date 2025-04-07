import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
    selector: 'generated-from',
    templateUrl: './generated-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GeneratedForm {
    @Input() form: Observable<any>;
}
