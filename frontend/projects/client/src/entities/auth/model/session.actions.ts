import {createAction, props} from '@ngrx/store';
import {Session} from '@ory/kratos-client';

export const SetSessionAction = createAction(
    "[session] set session",
    props<{ session: Session }>(),
)

export const GetSessionAction = createAction(
    "[session] get session",
)
