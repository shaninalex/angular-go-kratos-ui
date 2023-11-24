import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './ui/logout/logout.component';
import { BackendService } from './services/backend.service';
import { SettingsComponent } from './components/settings/settings.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


const routes: Routes = [
    {
        path: "", component: AccountComponent
    }
];


@NgModule({
    declarations: [
        AccountComponent,
        LogoutComponent,
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputTextModule,
        ButtonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        BackendService
    ]
})
export class AccountModule { }
