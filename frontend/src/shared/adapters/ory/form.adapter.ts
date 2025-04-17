import {IFlow, INodeAdapter} from '@shared/adapters/ory/interfaces';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NodeAdapter} from '@shared/adapters/ory/node';


// NOTE: we need loop through nodes and render them in same order

export class OryFormAdapter {
    private _nodes: UiNode[] = [];
    private _messages: UiText[] = [];
    private readonly nodeAdapter: INodeAdapter;

    constructor() {
        this.nodeAdapter = new NodeAdapter()
    }

    getNodes(): UiNode[] {
        return this._nodes;
    }

    init(flow: IFlow) {
        this._nodes = flow.ui.nodes;
        if (flow.ui.messages) {
            this._messages = flow.ui.messages;
        }
    }

    form(): FormGroup {
        const controls: Record<string, FormControl> = {};
        for (const node of this._nodes) {
            const attr = this.getInputAttributes(node);
            if (!attr) continue;

            // TODO: set validators based on attributes
            // email field should have Validators.email

            const validators: Validators = this.setValidators(attr)
            controls[attr.name] = new FormControl(
                attr.value ?? '',
                validators,
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

    public processNode(): INodeAdapter {
        return this.nodeAdapter
    }

    /**
     * Extracts input attributes from a UiNode if it's an input node.
     */
    private getInputAttributes(node: UiNode): UiNodeInputAttributes | null {
        return node.attributes.node_type === 'input'
            ? (node.attributes as UiNodeInputAttributes)
            : null;
    }

    private setValidators(attr: UiNodeInputAttributes): Validators[] {
        let v: Validators[] = []
        if (attr.required) {
            v.push(Validators.required)
        }
        if (attr.type === "email") {
            v.push(Validators.email)
        }
        return v;
    }
}
