import {ResolveFn} from '@angular/router';
import {RegistrationFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {inject} from '@angular/core';
import {tap} from 'rxjs';

export const registrationFlowResolver: ResolveFn<RegistrationFlow | undefined> = (route) => {
    const service = inject(AuthService)
    return service.RegistrationFlow()
};
