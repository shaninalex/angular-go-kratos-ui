import {FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow} from '@ory/kratos-client';
import {UiContainer, UiNodeGroupEnum} from '@ory/kratos-client/api';

export type TFlow = LoginFlow | RegistrationFlow | RecoveryFlow | SettingsFlow | FlowError;

// Extract the common "ui" field
export type TFlowWithUI = { ui: UiContainer };

// Narrow TFlow to flows that always have ui
export type TFlowUI = TFlow & TFlowWithUI;


// Docs: https://www.ory.sh/docs/kratos/reference/api#tag/frontend/operation/updateRegistrationFlow

export interface RegistrationFlowPayload {
    method: string
    traits: Traits
    code?: string
    csrf_token?: string
    resend?: string
    password?: string
    // transient_payload: TransientPayload
}

// should be based on a identity schema
export interface Traits {
    email: string
    name: Name
}

export interface Name {
    first: string
    last: string
}

export interface FormBuilderSubmitPayload {
    group: UiNodeGroupEnum,
    value: any
}
