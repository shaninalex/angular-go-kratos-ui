import {UiNodeAttributes, UiNodeInputAttributes} from '@ory/kratos-client';

export function isInputAttributes(
    attrs: UiNodeAttributes
): attrs is UiNodeInputAttributes & { node_type: 'input' } {
    return attrs.node_type === "input";
}
