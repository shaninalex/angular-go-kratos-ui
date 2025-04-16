import {UiContainer} from '@ory/kratos-client/api';

/**
 * Unfortunately @ory/kratos-client does not provide global interface
 * for different flows. May be it's because of auto generation method. Real
 * developers probably will came up to that idea.
 */
export interface IFlow {
    /**
     * ID represents the request's unique ID. type: string format: uuid
     */
    id: string
    /**
     * ExpiresAt is the time (UTC) when the request expires
     */
    expires_at: string
    /**
     * State represents the state of this request
     */
    state: string
    /**
     * The flow type can either be `api` or `browser`.
     */
    type: string
    /**
     * Form nodes and attributes
     */
    ui: UiContainer
}
