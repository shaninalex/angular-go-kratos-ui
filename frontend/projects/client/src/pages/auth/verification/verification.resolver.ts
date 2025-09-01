// login resolver
import {ResolveFn} from '@angular/router';
import {VerificationFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {inject} from '@angular/core';

export const verificationFlowResolver: ResolveFn<VerificationFlow | undefined> = (route) => {
    const service = inject(AuthService)
    return service.GetVerificationFlow()
};
