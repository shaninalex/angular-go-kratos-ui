import {FormGroup} from '@angular/forms';
import {UiNode, UiNodeInputAttributes, UiText} from '@ory/kratos-client';
import {IFlow} from './interfaces';
import {OryMessageService} from './form-messages.service';
import {OryFormRenderer} from './form.renderer';
import {OryFormAdapter} from './form.adapter'

export class OryFormManager {
    adapter: OryFormAdapter;
    renderer: OryFormRenderer;
    messages: OryMessageService;

    constructor() {
        this.adapter = new OryFormAdapter();
        this.renderer = new OryFormRenderer(this.adapter);
        this.messages = new OryMessageService(this.adapter);
    }

    init(flow: IFlow) {
        this.adapter.init(flow);
    }

    get groups(): string[] {
        return this.adapter.groups
    }

    getForm(): FormGroup {
        return this.adapter.form();
    }

    getGroupForm(group: string): FormGroup {
        return this.adapter.formByGroup(group);
    }

    renderGroup(group: string): UiNode[] {
        return this.renderer.renderGroup(group);
    }

    renderAll(): UiNode[] {
        return this.renderer.renderAll();
    }

    getMessages(): UiText[] {
        return this.messages.getMessages();
    }

    inputAttr(node: UiNode): UiNodeInputAttributes {
        return this.adapter.inputAttr(node)
    }
}
