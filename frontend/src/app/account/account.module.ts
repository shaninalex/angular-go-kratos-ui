import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './ui/logout/logout.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './ui/header/header.component';
import { ThemeSwitcherComponent } from './ui/theme-switcher/theme-switcher.component';
import { HomeComponent } from './pages/home/home.component';
import { TextFormComponent } from './ui/text-form/text-form.component';
import { VerificationComponent } from './pages/verification/verification.component';


const routes: Routes = [
    {
        path: "", component: AccountComponent, children: [
            {path: "", component: HomeComponent },
            {path: "settings", component: SettingsComponent },
            {path: "verification", component: VerificationComponent },
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
        TextFormComponent,
        VerificationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
})
export class AccountModule { }
