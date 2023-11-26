import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './actions';
import { IdentityObject } from 'src/app/typedefs/identity';

export interface AppState {
    identity: IdentityObject | null;
}

export const initialState: AppState = {
    identity: null,
};

export const identityReducer = createReducer(
    initialState,
    on(IdentityActions.SetIdentity, (state, action) => ({ identity: action.user_info })),
);