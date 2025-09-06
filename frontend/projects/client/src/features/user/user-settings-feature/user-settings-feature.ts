import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilderComponent, FormMessagesComponent} from '@client/shared/ui';
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
        NgClass,
        FormMessagesComponent,
    ],
    template: `
        @if (form) {
            <div class="flex gap-4 mb-4">
                <button class="cursor-pointer text-sm" [ngClass]="{'underline': active_tab === 'profile'}"
                        (click)="setTab('profile')">Profile
                </button>
                <button class="cursor-pointer text-sm" [ngClass]="{'underline': active_tab === 'password'}"
                        (click)="setTab('password')">Password
                </button>
                <button class="cursor-pointer text-sm" [ngClass]="{'underline': active_tab === 'lookup_secret'}"
                        (click)="setTab('lookup_secret')">Lookup secret
                </button>
                <button class="cursor-pointer text-sm" [ngClass]="{'underline': active_tab === 'totp'}"
                        (click)="setTab('totp')">TOTP
                </button>
                <button class="cursor-pointer text-sm" [ngClass]="{'underline': active_tab === 'oidc'}"
                        (click)="setTab('oidc')">Social Accounts
                </button>
            </div>

            @if (form.ui.messages) {
                <div class="mb-4">
                    <kr-form-messages [messages]="form.ui.messages"/>
                </div>
            }

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
                @case ('oidc') {
                    @if (oidc_group.nodes.length > 1) {
                        <kr-form-builder
                            [formUI]="oidc_group"
                            (formSubmit)="onFormSubmit($event)"
                        />
                    } @else {
                        <div class="bg-slate-100 p-2 text-small">Now social accounts linked</div>
                    }
                }
            }
        } @else {
            loading...
        }
    `,
})
export class UserSettingsFeature implements OnInit {
    @Input() form: SettingsFlow;
    private api = inject(UserService);
    private router = inject(Router);

    active_tab: UiNodeGroupEnum = 'profile'; // TODO: read value from localstorage or on "profile" tab

    profile_group!: UiContainer;
    password_group!: UiContainer;
    lookup_secret_group!: UiContainer;
    totp_group!: UiContainer;
    oidc_group!: UiContainer;

    ngOnInit() {
        this.buildGroups(this.form);
    }

    setTab(tab: UiNodeGroupEnum) {
        this.active_tab = tab;
        localStorage.setItem('settings_tab', tab);
    }

    onFormSubmit(data: FormBuilderSubmitPayload): void {
        this.api.submitSettingsForm(this.form.id, data).subscribe({
            next: resp => {
                if (resp.continue_with) {
                    for (const action of resp.continue_with) {
                        if (action.action === 'show_verification_ui' && action.flow.url) {
                            this.router.navigateByUrl(makeLink(action.flow.url));
                            return;
                        }
                        if (action.action === 'redirect_browser_to') {
                            this.router.navigateByUrl(makeLink(action.redirect_browser_to));
                            return;
                        }
                    }
                }
                this.updateForm(resp);
            },
            error: err => {
                if (err.error?.redirect_browser_to) {
                    window.location.href = err.error.redirect_browser_to;
                } else if (err.error) {
                    this.updateForm(err.error);
                }
            }
        });
    }

    private updateForm(newForm: SettingsFlow) {
        this.form = {...newForm};
        this.buildGroups(this.form);
    }

    private buildGroups(form: SettingsFlow) {
        this.profile_group = {
            action: form.ui.action,
            method: 'POST',
            nodes: this.filterNodes(form.ui.nodes, ['profile', 'default']),
        };
        this.password_group = {
            action: form.ui.action,
            method: 'POST',
            nodes: this.filterNodes(form.ui.nodes, ['password', 'default']),
        };
        this.lookup_secret_group = {
            action: form.ui.action,
            method: 'POST',
            nodes: this.filterNodes(form.ui.nodes, ['lookup_secret', 'default']),
        };
        this.totp_group = {
            action: form.ui.action,
            method: 'POST',
            nodes: this.filterNodes(form.ui.nodes, ['totp', 'default']),
        };
        this.oidc_group = {
            action: form.ui.action,
            method: 'POST',
            nodes: this.filterNodes(form.ui.nodes, ['oidc', 'default']),
        };
    }

    private filterNodes(nodes: UiNode[], groups: string[]): UiNode[] {
        return nodes.filter(node => groups.includes(node.group as string));
    }
}


