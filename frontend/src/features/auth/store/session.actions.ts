import {createAction, props} from "@ngrx/store";
import {Session} from '@ory/kratos-client';

export const SetSession = createAction(
    "[session] Set",
    props<{ session: Session }>()
);
