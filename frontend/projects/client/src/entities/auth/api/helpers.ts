import {
    UpdateLoginFlowBody, UpdateRecoveryFlowWithCodeMethod,
    UpdateRegistrationFlowBody,
    UpdateVerificationFlowWithCodeMethod
} from '@ory/kratos-client';
import {UpdateRegistrationFlowWithProfileMethodScreenEnum} from '@ory/kratos-client/api';


export function registrationWithOIDC(provider: string): UpdateRegistrationFlowBody {
    return {method: 'oidc', provider};
}

export function registrationWithPassword(password: string, csrf: string, traits: any): UpdateRegistrationFlowBody {
    return {
        method: 'password',
        password: password,
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

export function loginWithOIDC(provider: string): UpdateLoginFlowBody {
    return {method: "oidc", provider}
}

export function loginWithPassword(email: string, password: string, csrf: string): UpdateLoginFlowBody {
    return {
        method: 'password',
        password: password,
        csrf_token: csrf,
        identifier: email,
    };
}

export function verificationWithCode(data : any): UpdateVerificationFlowWithCodeMethod {
    return {
        csrf_token: data["csrf_token"],
        code: data["code"],
        method: "code",
    }
}

export function recoveryWithCode(data : any): UpdateRecoveryFlowWithCodeMethod {
    let payload: UpdateRecoveryFlowWithCodeMethod = {
        method: "code",
        csrf_token: data["csrf_token"],
        email: data["email"]
    }

    if ("code" in data) {
        payload["code"] = data["code"]
    }
    return payload
}
