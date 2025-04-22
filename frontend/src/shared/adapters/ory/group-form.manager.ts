import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {IFlow} from './interfaces';
import _ from 'lodash';


export class GroupFormManager {
    private _flow: IFlow;
    private _groups: Record<string, UiNode[]> = {};
    private _messages: UiText[] = [];

    init(flow: IFlow): void {
        this._flow = flow;
        this._groups = _.groupBy(this._flow.ui.nodes, 'group');
        if (flow.ui.messages) {
            this._messages = flow.ui.messages;
        }
    }

    buildGroupForm(): FormGroup {
        const formGroups: Record<string, FormGroup> = {};
        for (const [group, nodes] of Object.entries(this._groups)) {
            const controls: Record<string, FormControl> = {};
            for (const node of nodes) {
                const attr = this.inputAttr(node);
                if (node.type !== 'input') continue
                const value = typeof attr.value === 'string' ? attr.value : (attr.value ?? '');
                const validators: Validators = this.setValidators(attr)
                controls[attr.name] = new FormControl(value, validators);
            }
            formGroups[group] = new FormGroup(controls);
        }
        return new FormGroup(formGroups);
    }

    get groups(): string[] {
        return Object.keys(this._groups)
    }

    inputAttr(node: UiNode): UiNodeInputAttributes {
        return node.attributes as UiNodeInputAttributes;
    }

    renderGroup(group: string): UiNode[] {
        return this._groups[group]
    }

    messages(): UiText[] {
        return this._messages;
    }

    private setValidators(attr: UiNodeInputAttributes): Validators[] {
        let v: Validators[] = []
        if (attr.required) {
            v.push(Validators.required)
        }
        if (attr.type === "email") {
            v.push(Validators.email)
        }
        // TODO: min/max length
        return v;
    }
}
