import {IFlow, INodeAdapter} from '@shared/adapters/ory/interfaces';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NodeAdapter} from './node';
import _ from 'lodash';


export class OryFormAdapter {
    private _nodes: UiNode[] = [];
    private _groups: Record<string, UiNode[]> = {};
    private _messages: UiText[] = [];

    constructor(private readonly nodeAdapter: INodeAdapter = new NodeAdapter()) {
    }

    init(flow: IFlow) {
        this._nodes = flow.ui.nodes;
        this._groups = _.groupBy(this._nodes, 'group');
        this._messages = flow.ui.messages ?? [];
    }

    // Returns all controls
    form(): FormGroup {
        return this.buildForm(this._nodes);
    }

    // Returns controls for a specific group
    formByGroup(group: string): FormGroup {
        return this.buildForm(this.groupByName(group));
    }

    groupByName(group: string): UiNode[] {
        return this._groups[group] ?? [];
    }

    getMessages(): UiText[] {
        return this._messages;
    }

    getNodes(): UiNode[] {
        return this._nodes;
    }

    inputAttr(node: UiNode): UiNodeInputAttributes {
        return this.nodeAdapter.inputAttributes(node);
    }

    get groups(): string[] {
        return Object.keys(this._groups)
    }

    /**
     * Return form group by given set of UiNode's
     * @param nodes
     * @private
     */
    private buildForm(nodes: UiNode[]): FormGroup {
        const controls: Record<string, FormControl> = {};
        for (const node of nodes) {
            const attr = this.getInputAttributes(node);
            if (!attr) continue;
            const validators: Validators = this.setValidators(attr)
            controls[attr.name] = new FormControl(attr.value ?? '', validators);
        }
        return new FormGroup(controls);
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
        // TODO: min/max length
        return v;
    }
}
