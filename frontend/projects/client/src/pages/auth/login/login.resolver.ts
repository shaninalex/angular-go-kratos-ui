import {ResolveFn} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {inject} from '@angular/core';

export const loginFlowResolver: ResolveFn<LoginFlow | undefined> = (route) => {
    const service = inject(AuthService)
    return service.LoginFlow()
};
