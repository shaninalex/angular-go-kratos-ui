import {FormGroup} from '@angular/forms';
import {UiContainer} from '@ory/kratos-client/api';

export interface IKratosFormControlService {
    toFormGroup(ui: UiContainer): FormGroup
    toFormInputs(ui: UiContainer): InputBase[]
}

export class InputBase {
    value: string;
    name: string;
    required: boolean;
    controlType: string;
    placeholder: string;

    constructor(
        options: {
            value?: string;
            name?: string;
            required?: boolean;
            controlType?: string;
            placeholder?: string
        } = {},
    ) {
        this.value = options.value ?? ''
        this.name = options.name ?? ''
        this.required = options.required ?? true
        this.controlType = options.controlType ?? 'text'
        this.placeholder = options.placeholder ?? ''
    }
}
