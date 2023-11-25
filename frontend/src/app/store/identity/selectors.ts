import { createSelector } from '@ngrx/store';
import { AppState } from './reducer';


export const selectIdentity = (state: AppState) => state.identity;


export const selectIdentityObject = createSelector(
    selectIdentity,
    (state: AppState) => state.identity
);

export const selectTraits = createSelector(
    selectIdentity,
    (state: AppState) => state.identity.identity.traits
);