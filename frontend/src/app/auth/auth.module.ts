import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneratedForm } from './components/generated-form/generated-form.component';


const routes: Routes = [
    { path: "", component: AuthComponent, children: [
        { path: "login", component: LoginComponent },
        { path: "registration", component: RegisterComponent },
        { path: "verification", component: VerificationComponent },
        { path: "recovery", component: RecoveryComponent },
    ]}
];


@NgModule({ declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        RecoveryComponent,
        GeneratedForm
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
