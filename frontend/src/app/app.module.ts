import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { identityReducer } from './store/identity/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { IdentityEffects } from './store/identity/effects';
import { MessagesService } from './shared/messages.service';
import { ErrorComponent } from './error/error.component';
import { BackendService } from './shared/backend.service';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanActiveteAccountPage } from './shared/auth.guard';


const routes: Routes = [
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "app",
        canLoad: [CanActiveteAccountPage],
        loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
    },
    { path: "404", component: NotFoundComponent },
    { path: "error", component: ErrorComponent },
    { path: "**", redirectTo: "404" }
];


@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
            identity: identityReducer
        }, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([IdentityEffects]),
        RouterModule.forRoot(routes)
    ],
    providers: [
        BackendService,
        UIService,
        MessagesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
