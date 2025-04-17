import {UiNode, UiNodeInputAttributes} from '@ory/kratos-client';
import {INodeAdapter} from '@shared/adapters/ory/interfaces';

export class NodeAdapter implements INodeAdapter {
    inputAttributes(node: UiNode): UiNodeInputAttributes {
        return node.attributes as UiNodeInputAttributes
    }
}
