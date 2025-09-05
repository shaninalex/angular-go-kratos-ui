import {
    FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow,
    GenericError
} from '@ory/kratos-client';
import {UiContainer, UiNodeGroupEnum} from '@ory/kratos-client/api';

export type TFlow = LoginFlow | RegistrationFlow | RecoveryFlow | SettingsFlow | FlowError;

// Extract the common "ui" field
export type TFlowWithUI = { ui: UiContainer };

// Narrow TFlow to flows that always have ui
export type TFlowUI = TFlow & TFlowWithUI;


// Docs: https://www.ory.sh/docs/kratos/reference/api#tag/frontend/operation/updateRegistrationFlow
export interface FormBuilderSubmitPayload {
    group: UiNodeGroupEnum,
    action: string,
    value: string,
    form: any
}

export function isGenericError(err: unknown): err is GenericError {
    return typeof err === "object" && err !== null && "id" in err;
}
