import { createAction, props } from "@ngrx/store";


export const SetIdentity = createAction(
    "[identity] Set",
    props<{user_info: any}>()
);