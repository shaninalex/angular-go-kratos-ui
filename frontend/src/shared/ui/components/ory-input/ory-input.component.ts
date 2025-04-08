import {Component, Input} from '@angular/core';
import {UiNode, UiNodeAttributes} from "@ory/kratos-client";

function nodeAttributes(attributes: UiNodeAttributes): any {
    return attributes as any
}

@Component({
    selector: 'ory-input',
    templateUrl: 'ory-input.component.html'
})
export class OryInputComponent {
    @Input() node: UiNode;

    attr(): any {
        return nodeAttributes(this.node.attributes)
    }
}
