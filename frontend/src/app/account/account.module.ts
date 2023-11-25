import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './ui/logout/logout.component';
import { BackendService } from './services/backend.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './ui/header/header.component';
import { ThemeSwitcherComponent } from './ui/theme-switcher/theme-switcher.component';
import { HomeComponent } from './pages/home/home.component';
import { FormProfileComponent } from './pages/settings/components/form-profile/form-profile.component';
import { FormPasswordComponent } from './pages/settings/components/form-password/form-password.component';
import { FormLookupSecretComponent } from './pages/settings/components/form-lookup-secret/form-lookup-secret.component';
import { FormTotpComponent } from './pages/settings/components/form-totp/form-totp.component';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
    {
        path: "", component: AccountComponent, children: [
            {path: "", component: HomeComponent },
            {path: "settings", component: SettingsComponent },
            {path: "error", component: ErrorComponent },
        ]
    }
];


@NgModule({
    declarations: [
        AccountComponent,
        LogoutComponent,
        SettingsComponent,
        HeaderComponent,
        ThemeSwitcherComponent,
        HomeComponent,
        FormProfileComponent,
        FormPasswordComponent,
        FormLookupSecretComponent,
        FormTotpComponent,
        ErrorComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        BackendService
    ]
})
export class AccountModule { }
