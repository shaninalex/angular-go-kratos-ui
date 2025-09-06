import {
    UpdateSettingsFlowWithPasswordMethod,
    UpdateSettingsFlowWithProfileMethod,
    UpdateSettingsFlowWithTotpMethod
} from '@ory/kratos-client';

export function toProfilePayload(form: any): UpdateSettingsFlowWithProfileMethod {
    return {
        csrf_token: form['csrf_token'],
        method: 'profile',
        traits: {
            email: form['traits.email'],
            name: {
                first: form['traits.name.first'],
                last: form['traits.name.last'],
            },
        },
    }
}

export function toPasswordPayload(form: any): UpdateSettingsFlowWithPasswordMethod {
    return {
        csrf_token: form['csrf_token'],
        method: 'password',
        password: form['password']
    }
}

// export function toLookupSecretPayload(): {
//     return null
// }

export function toTOTPPayload(form: any): UpdateSettingsFlowWithTotpMethod {
    return {
        csrf_token: form['csrf_token'],
        method: 'totp',
        totp_code: form['totp_code']
    }
}
