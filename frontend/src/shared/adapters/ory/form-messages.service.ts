import {UiText} from '@ory/kratos-client';
import {OryFormAdapter} from './form.adapter';

export class OryMessageService {
    constructor(private adapter: OryFormAdapter) {}

    getMessages(): UiText[] {
        return this.adapter.getMessages();
    }
}
