import {OryFormAdapter} from './form.adapter';
import {UiNode} from '@ory/kratos-client';

export class OryFormRenderer {
    constructor(private adapter: OryFormAdapter) {
    }

    renderGroup(group: string): UiNode[] {
        return this.adapter.groupByName(group);
    }

    renderAll(): UiNode[] {
        return this.adapter.getNodes();
    }
}
