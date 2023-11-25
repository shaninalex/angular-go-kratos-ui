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


const routes: Routes = [
    {
        path: "", component: AccountComponent, children: [
            {path: "", component: HomeComponent },
            {path: "settings", component: SettingsComponent },
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
