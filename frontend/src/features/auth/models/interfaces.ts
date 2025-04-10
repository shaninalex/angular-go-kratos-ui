export class InputBase {
    value: string;
    name: string;
    required: boolean;
    controlType: string;
    placeholder: string;
    errors?: string[];

    constructor(
        options: {
            value?: string
            name?: string
            required?: boolean
            controlType?: string
            placeholder?: string
            errors?: string[]
        } = {},
    ) {
        this.value = options.value ?? ''
        this.name = options.name ?? ''
        this.required = options.required ?? true
        this.controlType = options.controlType ?? 'text'
        this.placeholder = options.placeholder ?? ''
        this.errors = options.errors ?? []
    }
}

