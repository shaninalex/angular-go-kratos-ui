import {Routes} from '@angular/router';
import {
    AuthPageWrapperComponent, ErrorPageComponent,
    LoginPageComponent,
    RecoveryPageComponent,
    RegisterPageComponent,
    VerifyPageComponent
} from '@pages/auth';
import {DashboardWrapperComponent, HomePageComponent} from '@pages/dashboard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthPageWrapperComponent,
        children: [
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'registration',
                component: RegisterPageComponent
            },
            {
                path: 'verify',
                component: VerifyPageComponent
            },
            {
                path: 'recovery',
                component: RecoveryPageComponent
            },
            {
                path: 'error',
                component: ErrorPageComponent
            },
        ]
    },
    {
        path: '',
        component: DashboardWrapperComponent,
        children: [
            {
                path: '',
                component: HomePageComponent
            }
        ]
    }
];
