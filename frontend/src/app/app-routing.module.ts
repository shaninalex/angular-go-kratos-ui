import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanActiveteAccountPage } from './shared/auth.guard';

const routes: Routes = [
    { 
        path: "auth", 
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) 
    },
    { 
        path: "account", 
        canLoad: [CanActiveteAccountPage],
        loadChildren: () => import("./account/account.module").then(m => m.AccountModule) 
    },
    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
