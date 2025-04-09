import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IKratosFormControlService, InputBase} from './interfaces'
import {UiContainer} from '@ory/kratos-client/api';
import {UiNode, UiNodeInputAttributes} from '@ory/kratos-client';

@Injectable()
export class FormControlService implements IKratosFormControlService {
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
                });
            })
            .filter((input): input is InputBase => input !== null);
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
