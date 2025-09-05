import {
    UiNodeAttributes,
    UiNodeInputAttributes,
    UpdateLoginFlowBody,
    UpdateRecoveryFlowWithCodeMethod,
    UpdateRegistrationFlowBody,
    UpdateVerificationFlowWithCodeMethod
} from '@ory/kratos-client';


export function registrationWithOIDC(provider: string): UpdateRegistrationFlowBody {
    return {method: 'oidc', provider};
}

export function registrationWithPassword(form: any): UpdateRegistrationFlowBody {
    return {
        method: 'password',
        password: form['password'],
        csrf_token: form['csrf_token'],
        traits: {
            email: form['traits.email'],
            name: {
                first: form['traits.name.first'],
                last: form['traits.name.last'],
            },
        },
    };
}

export function loginWithOIDC(provider: string): UpdateLoginFlowBody {
    return {method: "oidc", provider}
}

export function loginWithPassword(form: any): UpdateLoginFlowBody {
    return {
        method: 'password',
        password: form['password'],
        csrf_token: form['csrf_token'],
        identifier: form['identifier'],
    };
}

export function verificationWithCode(data: any): UpdateVerificationFlowWithCodeMethod {
    return {
        csrf_token: data["csrf_token"],
        code: data["code"],
        method: "code",
    }
}

export function recoveryWithCode(data: any): UpdateRecoveryFlowWithCodeMethod {
    let payload: UpdateRecoveryFlowWithCodeMethod = {
        method: "code",
        csrf_token: data["csrf_token"],
        email: data["email"],
    }

    if ("code" in data) {
        payload.code = data["code"]
    }
    return payload
}

export function isInputAttributes(
    attrs: UiNodeAttributes
): attrs is UiNodeInputAttributes & { node_type: 'input' } {
    return attrs.node_type === "input";
}
