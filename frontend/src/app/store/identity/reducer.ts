import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './actions';

export interface AppState {
    identity: any;
}

export const initialState: AppState = {
    identity: undefined,
};

export const identityReducer = createReducer(
    initialState,
    on(IdentityActions.SetIdentity, (state, action) => ({ identity: action.user_info })),
);