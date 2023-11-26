import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './shared/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { identityReducer } from './store/identity/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { IdentityEffects } from './store/identity/effects';
import { MessagesService } from './shared/messages.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
            identity: identityReducer
        }, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([IdentityEffects])
    ],
    providers: [
        AccountService,
        UIService,
        MessagesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
