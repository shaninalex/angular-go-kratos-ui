import {UiText} from '@ory/kratos-client';

export class InputBase {
    value: string;
    name: string;
    required: boolean;
    controlType: string;
    placeholder: string;
    messages?: UiText[];

    constructor(
        options: {
            value?: string
            name?: string
            required?: boolean
            controlType?: string
            placeholder?: string
            messages?: UiText[]
        } = {},
    ) {
        this.value = options.value ?? ''
        this.name = options.name ?? ''
        this.required = options.required ?? true
        this.controlType = options.controlType ?? 'text'
        this.placeholder = options.placeholder ?? ''
        this.messages = options.messages ?? []
    }
}

