import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/store/identity/reducer';
import { selectTraits } from 'src/app/store/identity/selectors';


interface Traits {
    email: string
    name: {first: string, last: string}
    image: string
}

@Component({
    selector: '#header',
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
    traits$: Observable<Traits>;

    constructor(
        private store: Store<AppState>
    ) {
        this.traits$ = this.store.select(selectTraits).pipe(
            tap(data => console.log(data))
        );
    }

}
