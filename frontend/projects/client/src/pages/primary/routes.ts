import {Routes} from '@angular/router';
import {PrimaryRoot} from './primary-root';
import {SettingsPage} from './settings-page/settings-page';
import {CanMatchPrimarySection} from '@client/entities/user'

export const primaryRoutes: Routes = [
    {
        path: "",
        component: PrimaryRoot,
        canMatch: [CanMatchPrimarySection],
        children: [
            {
                path: "settings",
                component: SettingsPage,
            },
        ]
    },
]
