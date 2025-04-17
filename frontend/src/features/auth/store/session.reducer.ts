import {createReducer, on} from '@ngrx/store';
import * as SessionActions from './session.actions';
import {Session} from '@ory/kratos-client';

export interface SessionState {
    session: Session | null;
}

export const initialState: SessionState = {
    session: null,
};

export const sessionReducer = createReducer(
    initialState,
    on(SessionActions.SetSession, (state, action) => ({session: action.session})),
);
