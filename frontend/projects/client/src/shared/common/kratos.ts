import {FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow, IdentityCredentialsOidcProvider} from '@ory/kratos-client';
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
