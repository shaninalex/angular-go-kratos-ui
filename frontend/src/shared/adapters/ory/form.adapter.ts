import {IFlow} from '@shared/adapters/ory/interfaces';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {FormControl, FormGroup, Validators} from '@angular/forms';


// NOTE: we need loop through nodes and render them in same order

export class OryFormAdapter {
    private _nodes: UiNode[] = [];
    private _messages: UiText[] = [];

    getNodes(): UiNode[] {
        return this._nodes;
    }

    init(flow: IFlow) {
        this._nodes = flow.ui.nodes;
    }

    form(): FormGroup {
        const controls: Record<string, FormControl> = {};
        for (const node of this._nodes) {
            const attr = this.getInputAttributes(node);
            if (!attr) continue;

            // TODO: set validators based on attributes
            // email field should have Validators.email
            controls[attr.name] = new FormControl(
                attr.value ?? '',
                attr.required ? Validators.required : []
            );
        }
        return new FormGroup(controls);
    }

    get messages(): UiText[] {
        return this._messages;
    }

    set messages(msgs: UiText[]) {
        this._messages.push(...msgs)
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
