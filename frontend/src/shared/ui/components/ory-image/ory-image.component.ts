import {Component, Input} from '@angular/core';
import {UiNode, UiNodeAnchorAttributes, UiNodeImageAttributes} from '@ory/kratos-client';

@Component({
    selector: 'ory-image',
    template: `
    <div>
        <img class="block max-w-full"
            [src]="attr.src"
             [width]="attr.width"
             [height]="attr.height"
             alt="image">
    </div>
    `
})
export class OryImageComponent {
    @Input() node: UiNode; // node of type UiNodeTypeEnum.Img

    get attr(): UiNodeImageAttributes {
        return this.node.attributes as UiNodeImageAttributes;
    }
}
