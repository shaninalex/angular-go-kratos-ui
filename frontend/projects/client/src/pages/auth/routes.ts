import {Routes} from '@angular/router';
import {Login} from './login/login';
import {Registration} from './registration/registration';
import {Verification} from './verification/verification';
import {loginFlowResolver} from './login/login.resolver';
import {registrationFlowResolver} from './registration/registration.resolver';

export const authRoutes: Routes = [
    {
        path: "auth/login",
        resolve: {form: loginFlowResolver},
        component: Login,
    },
    {
        path: "auth/registration",
        resolve: {form: registrationFlowResolver},
        component: Registration,
    },
    {
        path: "auth/verification",
        // resolve: {form: verificationFlowResolver},
        component: Verification,
    },
]
