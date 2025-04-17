import {Component, Input} from '@angular/core';
import {UiNode} from '@ory/kratos-client';
import {UiNodeTextAttributes} from '@ory/kratos-client/api';
import {UiTextMessage} from '@shared/ui';

@Component({
    selector: 'ory-text',
    imports: [
        UiTextMessage
    ],
    template: `
        <ui-text-message [msg]="attr.text"/>
    `
})
export class OryTextComponent {
    @Input() node: UiNode; // node of type UiNodeTypeEnum.Text

    get attr(): UiNodeTextAttributes {
        return this.node.attributes as UiNodeTextAttributes;
    }
}
