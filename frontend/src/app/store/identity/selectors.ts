import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducer';
import { IdentityObject } from 'src/app/typedefs/identity';


export const selectIdentityFeature = createFeatureSelector<AppState, IdentityObject>('identity');


export const selectIdentity = createSelector(
    selectIdentityFeature,
    (state: IdentityObject) => state
);


export const selectTraits = createSelector(
    selectIdentity,
    (state: any) => {
        return state?.identity.identity.traits
    }
);