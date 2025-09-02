import {UpdateLoginFlowBody, UpdateRegistrationFlowBody} from '@ory/kratos-client';


export function registrationWithOIDC(provider: string): UpdateRegistrationFlowBody {
    return {method: 'oidc', provider};
}

export function registrationWithPassword(password: string, csrf: string, traits: any): UpdateRegistrationFlowBody {
    return {
        method: 'password',
        password,
        csrf_token: csrf,
        traits: {
            email: traits['traits.email'],
            name: {
                first: traits['traits.name.first'],
                last: traits['traits.name.last'],
            },
        },
    };
}


export function registrationWithProfile(password: string, csrf: string, traits: any): UpdateRegistrationFlowBody {
    return {
        method: 'profile',
        csrf_token: csrf,
        screen: "credential-selection",
        traits: {
            email: traits['traits.email'],
            name: {
                first: traits['traits.name.first'],
                last: traits['traits.name.last'],
            },
        },
    };
}

export function loginWithOIDC(provider: string): UpdateLoginFlowBody {
    return {method: "oidc", provider}
}

export function loginWithPassword(email: string, password: string, csrf: string): UpdateLoginFlowBody {
    return {
        method: 'password',
        password: 'password',
        csrf_token: csrf,
        identifier: email,
    };
}
