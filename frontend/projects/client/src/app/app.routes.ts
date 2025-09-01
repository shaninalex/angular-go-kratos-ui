import { Routes } from '@angular/router';
import {primaryRoutes} from '@client/pages/primary';
import {authRoutes} from '@client/pages/auth';

export const routes: Routes = [
    ...authRoutes,
    ...primaryRoutes,
];
