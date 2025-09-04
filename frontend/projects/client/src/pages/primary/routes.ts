import {Routes} from '@angular/router';
import {PrimaryRoot} from './primary-root';
import {SettingsPage} from './settings-page/settings-page';

export const primaryRoutes: Routes = [
    {
        path: "",
        component: PrimaryRoot,
        // TODO: auth guard,
        children: [
            {
                path: "settings",
                component: SettingsPage,
            },
        ]
    },
]
