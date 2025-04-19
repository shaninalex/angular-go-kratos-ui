import {Component, Input} from '@angular/core';
import {UiNode} from '@ory/kratos-client';
import {UiNodeTextAttributes} from '@ory/kratos-client/api';

@Component({
    selector: 'ory-text',
    template: `
        <label for="">{{ node.meta.label?.text }}</label>
        <div class="input"
             [id]="attr.id">
            {{ attr.text.text }}
        </div>
    `
})
export class OryTextComponent {
    @Input() node: UiNode; // node of type UiNodeTypeEnum.Text

    get attr(): UiNodeTextAttributes {
        return this.node.attributes as UiNodeTextAttributes;
    }
}
