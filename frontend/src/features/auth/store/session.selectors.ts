import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SessionState} from '@features/auth/store/session.reducer';

export const selectIdentityFeature = createFeatureSelector<SessionState>('session');
export const selectSession = createSelector(
    selectIdentityFeature,
    (state: SessionState) => state.session
);
