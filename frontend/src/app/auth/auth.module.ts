import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthUIService } from './services/authui.service';


const routes: Routes = [
    { path: "", component: AuthComponent, children: [
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent },
        { path: "verification", component: VerificationComponent },
        { path: "recovery", component: RecoveryComponent },
    ]}
];


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        RecoveryComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        AuthService,
        AuthUIService
    ]
})
export class AuthModule { }
