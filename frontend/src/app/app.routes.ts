import {Routes} from '@angular/router';
import {
    AuthPageWrapperComponent, ErrorPageComponent,
    LoginPageComponent,
    RecoveryPageComponent,
    RegisterPageComponent,
    VerifyPageComponent
} from '@pages/auth';
import {DashboardWrapperComponent, HomePageComponent} from '@pages/dashboard';
import {AuthGuard} from '@features/auth/guard/auth.guard';

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
                path: 'verification',
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
        canMatch: [AuthGuard],
        children: [
            {
                path: '',
                component: HomePageComponent
            }
        ]
    }
];
