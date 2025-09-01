import {FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow} from '@ory/kratos-client';
import {UiContainer} from '@ory/kratos-client/api';

export type TFlow = LoginFlow | RegistrationFlow | RecoveryFlow | SettingsFlow | FlowError;

// Extract the common "ui" field
export type TFlowWithUI = { ui: UiContainer };

// Narrow TFlow to flows that always have ui
export type TFlowUI = TFlow & TFlowWithUI;
