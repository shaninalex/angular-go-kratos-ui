import {ResolveFn, Router} from '@angular/router';
import {LoginFlow} from '@ory/kratos-client';
import {AuthService} from '@client/entities/auth';
import {inject} from '@angular/core';
import {withGenericErrorHandling} from '@client/shared/common';

export const loginFlowResolver: ResolveFn<LoginFlow | undefined> = (route) => {
    const service = inject(AuthService)
    const router = inject(Router);

    // This is working, but! This is resolver. Resolver should resolve, NOT handle errors
    // for error handling use http middlewares
    return service.loginFlow().pipe(
        withGenericErrorHandling({
            session_already_available: () => router.navigateByUrl("/"),
            // can handle more error codes for later
        })
    )
};
