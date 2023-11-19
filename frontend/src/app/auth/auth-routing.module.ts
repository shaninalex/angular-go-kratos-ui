import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { RecoveryComponent } from './recovery/recovery.component';

const routes: Routes = [
    { path: "", children: [
        { path: "login", pathMatch: 'full', component: LoginComponent },
        { path: "register", component: RegisterComponent },
        { path: "verification", component: VerificationComponent },
        { path: "recovery", component: RecoveryComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
