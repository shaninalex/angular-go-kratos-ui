export interface IdentityObject {
    id: string
    active: boolean
    expires_at: string
    authenticated_at: string
    authenticator_assurance_level: string
    authentication_methods: AuthenticationMethod[]
    issued_at: string
    identity: Identity
    devices: Device[]
}

export interface AuthenticationMethod {
    method: string
    aal: string
    completed_at: string
}

export interface Identity {
    id: string
    schema_id: string
    schema_url: string
    state: string
    traits: Traits
    verifiable_addresses: VerifiableAddress[]
    recovery_addresses: RecoveryAddress[]
    metadata_public: any
    created_at: string
    updated_at: string
}

export interface Traits {
    name: Name
    email: string
}

export interface Name {
    last: string
    first: string
}

export interface VerifiableAddress {
    id: string
    value: string
    verified: boolean
    via: string
    status: string
    created_at: string
    updated_at: string
}

export interface RecoveryAddress {
    id: string
    value: string
    via: string
    created_at: string
    updated_at: string
}

export interface Device {
    id: string
    ip_address: string
    user_agent: string
    location: string
}
