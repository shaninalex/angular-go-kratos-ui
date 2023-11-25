import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AppState } from 'src/app/store/identity/reducer';
import { selectIdentityObject } from 'src/app/store/identity/selectors';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    session$: Observable<any>;

    constructor(
        private uiService: UIService,
        private store: Store<AppState>
    ) {
        this.uiService.title.next("Home");
        this.session$ = this.store.select(selectIdentityObject).pipe(
            map(data => {
                return JSON.stringify(data, null, 4);
            })
        );
    }
}
