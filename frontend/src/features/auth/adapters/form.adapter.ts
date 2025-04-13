import {UiContainer} from '@ory/kratos-client/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {InputBase} from '@features/auth/models/interfaces';


export class KratosFormAdapter {
    controlService: IControlService

    private group: FormGroup = new FormGroup({});
    private entries: InputBase[] = [];
    private messages: UiText[] | undefined = [];

    constructor() {
        this.controlService = new FormControlService()
    }

    init(ui: UiContainer) {
        this.group = this.controlService.toFormGroup(ui)
        this.entries = this.controlService.toFormInputs(ui)
        this.messages = ui.messages;
    }

    get formGroup(): FormGroup {
        return this.group
    }

    get formEntries(): InputBase[] {
        return this.entries
    }

    get formMessages(): UiText[] {
        return this.messages ?? []
    }

    set formMessages(msg: UiText[]) {
        this.messages = msg
    }

}


export interface IControlService {
    toFormGroup(ui: UiContainer): FormGroup

    toFormInputs(ui: UiContainer): InputBase[]
}

export class FormControlService implements IControlService {
    toFormGroup(ui: UiContainer): FormGroup {
        const controls: Record<string, FormControl> = {};
        for (const node of ui.nodes) {
            const attr = this.getInputAttributes(node);
            if (!attr) continue;

            controls[attr.name] = new FormControl(
                attr.value ?? '',
                attr.required ? Validators.required : []
            );
        }
        return new FormGroup(controls);
    }

    toFormInputs(ui: UiContainer): InputBase[] {
        return ui.nodes.map(node => {
            const attr = this.getInputAttributes(node);
            if (!attr) return null;

            return new InputBase({
                name: attr.name,
                value: attr.value,
                required: attr.required,
                controlType: attr.type,
                placeholder: node.meta?.label?.text || '',
                messages: node.messages,
            });
        }).filter((input): input is InputBase => input !== null);
    }


    /**
     * Extracts input attributes from a UiNode if it's an input node.
     */
    private getInputAttributes(node: UiNode): UiNodeInputAttributes | null {
        return node.attributes.node_type === 'input'
            ? (node.attributes as UiNodeInputAttributes)
            : null;
    }

}


