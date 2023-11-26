import { createAction, props } from "@ngrx/store";
import { Identity } from "src/app/typedefs/identity";


export const SetIdentity = createAction(
    "[identity] Set",
    props<{user_info: any}>()
);