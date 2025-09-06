import {Session} from '@ory/kratos-client';
import {createReducer, on} from '@ngrx/store';
import {SetSessionAction} from './session.actions';

export interface SessionState {
    session: Session | undefined
}

const initialState: SessionState = {
    session: undefined
};

export const sessionReducer = createReducer(
    initialState,
    on(SetSessionAction, (state, action) => ({
        ...state,
        session: action.session,
    })),
)
