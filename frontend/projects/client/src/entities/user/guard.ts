import {map, Observable, take} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {CanMatch, Router} from '@angular/router';
import {selectSession} from '@client/entities/auth';
import {Store} from '@ngrx/store';
import {AppState} from '@client/shared/common';

@Injectable({ providedIn: 'root' })
export class CanMatchPrimarySection implements CanMatch {
    private store = inject(Store<AppState>);
    private router = inject(Router);

    canMatch(): Observable<boolean> {
        return this.store.select(selectSession).pipe(
            take(1),
            map(session => {
                if (session) return true;
                // this.router.navigate(['/auth/login']);
                return false;
            })
        );
    }
}
