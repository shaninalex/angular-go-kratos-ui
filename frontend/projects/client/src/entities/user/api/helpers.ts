import {
    UpdateLoginFlowWithOidcMethod,
    UpdateSettingsFlowWithLookupMethod, UpdateSettingsFlowWithOidcMethod,
    UpdateSettingsFlowWithPasswordMethod,
    UpdateSettingsFlowWithProfileMethod,
    UpdateSettingsFlowWithTotpMethod
} from '@ory/kratos-client';
import {FormBuilderSubmitPayload} from '@client/shared/common';

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

export function toLookupSecretPayload(data: FormBuilderSubmitPayload): UpdateSettingsFlowWithLookupMethod {
    const out: UpdateSettingsFlowWithLookupMethod = {
        csrf_token: data.form['csrf_token'],
        method: "lookup",
    }
    switch (data.action) {
        case "lookup_secret_regenerate":
            out.lookup_secret_regenerate = true
            break;
        case "lookup_secret_confirm":
            out.lookup_secret_confirm = true
            break;
        case "lookup_secret_reveal":
            out.lookup_secret_reveal = true
            break;
        case "lookup_secret_disable":
            out.lookup_secret_disable = true
            break;
    }
    return out
}

export function toTOTPPayload(form: any): UpdateSettingsFlowWithTotpMethod {
    return {
        csrf_token: form['csrf_token'],
        method: 'totp',
        totp_code: form['totp_code']
    }
}

export function toOIDCPayload(flowID: string, data: FormBuilderSubmitPayload): UpdateSettingsFlowWithOidcMethod {
    const out: UpdateSettingsFlowWithOidcMethod = {
        flow: flowID,
        method: 'profile',
    }
    if (data.action === "unlink") {
        out.unlink = ""
    }
    return out
}
