import {Component, Input} from '@angular/core';
import {UiNode, UiNodeAnchorAttributes} from '@ory/kratos-client';

@Component({
    selector: 'ory-link',
    template: `
    <a [href]="attr.href" class="btn">{{ attr.title.text }}</a>
    `
})
export class OryLinkComponent {
    @Input() node: UiNode; // node of type UiNodeTypeEnum.A

    get attr(): UiNodeAnchorAttributes {
        return this.node.attributes as UiNodeAnchorAttributes;
    }
}
