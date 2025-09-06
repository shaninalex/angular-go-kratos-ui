import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilderComponent} from '@client/shared/ui';
import {SettingsFlow, UiNode} from '@ory/kratos-client';
import {Router} from '@angular/router';
import {FormBuilderSubmitPayload, makeLink} from '@client/shared/common';
import {UiContainer, UiNodeGroupEnum} from '@ory/kratos-client/api';
import {NgClass} from '@angular/common';
import {UserService} from '@client/entities/user';

@Component({
    selector: 'kr-user-settings-feature',
    imports: [
        FormBuilderComponent,
        NgClass
    ],
    template: `
        @if (ready) {
            <div class="flex gap-2 mb-4">
                <div class="cursor-pointer" [ngClass]="{'underline': active_tab === 'profile'}" (click)="active_tab = 'profile'">Profile</div>
                <div class="cursor-pointer" [ngClass]="{'underline': active_tab === 'password'}" (click)="active_tab = 'password'">Password</div>
                <div class="cursor-pointer" [ngClass]="{'underline': active_tab === 'lookup_secret'}" (click)="active_tab = 'lookup_secret'">Lookup secret</div>
                <div class="cursor-pointer" [ngClass]="{'underline': active_tab === 'totp'}" (click)="active_tab = 'totp'">TOTP</div>
            </div>

            @switch (active_tab) {
                @case ('profile') {
                    <kr-form-builder
                        [formUI]="profile_group"
                        (formSubmit)="onFormSubmit($event)"
                    />
                }
                @case ('password') {
                    <kr-form-builder
                        [formUI]="password_group"
                        (formSubmit)="onFormSubmit($event)"
                    />
                }
                @case ('lookup_secret') {
                    <kr-form-builder
                        [formUI]="lookup_secret_group"
                        (formSubmit)="onFormSubmit($event)"
                    />
                }
                @case ('totp') {
                    <kr-form-builder
                        [formUI]="totp_group"
                        (formSubmit)="onFormSubmit($event)"
                    />
                }
            }
        } @else {
            loading...
        }
    `,
})
export class UserSettingsFeature implements OnInit {
    @Input() form!: SettingsFlow;
    api = inject(UserService);
    router = inject(Router);
    ready = true; // force rerender completely form-builder component
    active_tab: UiNodeGroupEnum = "profile";

    profile_group: UiContainer
    password_group: UiContainer
    lookup_secret_group: UiContainer
    totp_group: UiContainer

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.ready = false; // force rerender completely form-builder component
        this.api.submitSettingsForm(this.form.id, data).subscribe({
            next: resp => {
                this.form = resp
                if (resp.continue_with) {
                    for (let action of resp.continue_with) {
                        if (action.action === "show_verification_ui" && action.flow.url) {
                            this.router.navigateByUrl(makeLink(action.flow.url))
                            return
                        }
                        if (action.action === "redirect_browser_to") {
                            this.router.navigateByUrl(makeLink(action.redirect_browser_to))
                            return
                        }
                    }
                }
            },
            error: (err) => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else {
                    this.form = err.error;
                }
            },
            complete: () => {
                this.ready = true
            }
        })
    }

    ngOnInit() {
        this.profile_group = {
            action: this.form.ui.action, method: "POST",
            nodes: this.form.ui.nodes.filter((node:UiNode) => node.group === "profile" || node.group === "default")
        };
        this.password_group = {
            action: this.form.ui.action, method: "POST",
            nodes: this.form.ui.nodes.filter((node:UiNode) => node.group === "password" || node.group === "default")
        };
        this.lookup_secret_group = {
            action: this.form.ui.action, method: "POST",
            nodes: this.form.ui.nodes.filter((node:UiNode) => node.group === "lookup_secret" || node.group === "default")
        };
        this.totp_group = {
            action: this.form.ui.action, method: "POST",
            nodes: this.form.ui.nodes.filter((node:UiNode) => node.group === "totp" || node.group === "default")
        };
    }
}


