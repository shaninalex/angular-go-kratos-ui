import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilderSubmitPayload} from '@client/shared/common';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {UiNode, UiNodeInputAttributes} from '@ory/kratos-client';
import {JsonPipe, NgClass} from '@angular/common';
import {makeLink} from '@client/shared/common';
import {RouterLink} from '@angular/router';
import {isInputAttributes} from '@client/shared/ui';
import {FormMessagesComponent} from './components/form-messages.component';
import {UiContainer} from '@ory/kratos-client/api';

@Component({
    selector: 'kr-form-builder',
    imports: [
        ReactiveFormsModule,
        NgClass,
        RouterLink,
        FormMessagesComponent,
    ],
    template: `
        @if (formUI) {
            <form [formGroup]="form">
                @if (formUI.messages) {
                    <div class="mb-4">
                        <kr-form-messages [messages]="formUI.messages"/>
                    </div>
                }
                @for (node of formUI.nodes; track $index) {
                    <ng-container>
                        <!-- Input fields -->
                        @if (node.type === 'input' && node.attributes.node_type === "input") {
                            @if (node.attributes.type !== 'hidden' && node.attributes.type !== 'submit') {
                                <div class="mb-4">
                                    <label>
                                        {{ label(node) }}
                                        @if (node.attributes.required) {
                                            <span class="text-red-500">*</span>
                                        }
                                    </label>
                                    <input
                                        class="mb-1 rounded-lg px-3 py-1 border block w-full border-slate-500 placeholder-slate-500"
                                        [attr.type]="node.attributes.type"
                                        [formControlName]="node.attributes.name"
                                        [attr.name]="node.attributes.name"
                                        [attr.autocomplete]="node.attributes.autocomplete || null"
                                        [attr.placeholder]="label(node)"
                                    />
                                    @if (node.messages) {
                                        <kr-form-messages [messages]="node.messages"/>
                                    }
                                </div>
                            }

                            <!-- Hidden inputs -->
                            @if (node.attributes.type === 'hidden' && node.attributes.node_type === "input") {
                                <input
                                    [attr.type]="'hidden'"
                                    [formControlName]="node.attributes.name"
                                    [attr.name]="node.attributes.name"
                                />
                            }

                            <!-- Submit buttons -->
                            @if (node.attributes.type === 'submit') {
                                <div class="mb-4">
                                    <button
                                        type="submit"
                                        class="border cursor-pointer rounded-lg px-3 py-1 disabled:bg-slate-200 disabled:pointer-events-none disabled:border-slate-200"
                                        [ngClass]="{
                                            'bg-red-200 hover:bg-rose-300 border-red-300': node.group === 'oidc',
                                            'bg-green-200 hover:bg-green-300 border-green-300': node.group !== 'oidc'
                                        }"
                                        (click)="onSubmit(node)"
                                        [disabled]="isSubmitDisabled(node)"
                                    >
                                        {{ label(node) || node.attributes.value }}
                                    </button>
                                </div>
                            }
                        }

                        @if (node.type === 'a' && node.attributes.node_type === "a") {
                            <div class="mb-4">
                                <a class="border cursor-pointer rounded-lg px-3 py-1 disabled:bg-slate-200 disabled:pointer-events-none disabled:border-slate-200"
                                   [routerLink]="makePath(node)">
                                    {{ label(node) }}
                                </a>
                            </div>
                        }


                        @if (node.type === 'img' && node.attributes.node_type === "img") {
                            <div class="mb-4">
                                <label>
                                    {{ label(node) }}
                                </label>
                                <img class="img-fluid"
                                     [id]="node.attributes.id"
                                     [width]="node.attributes.width"
                                     [height]="node.attributes.height"
                                     [src]="node.attributes.src"/>
                            </div>
                        }

                        @if (node.type === 'text' && node.attributes.node_type === "text") {
                            <div class="mb-4">
                                <p>
                                    {{ node.meta.label?.text }}
                                </p>
                                <code class="block p-2 rounded bg-slate-200">
                                    {{ node.attributes.text.text }}
                                </code>
                            </div>
                        }
                    </ng-container>
                }
            </form>
        }
    `
})
export class FormBuilderComponent implements OnInit {
    @Input() formUI!: UiContainer;
    @Output() formSubmit: EventEmitter<FormBuilderSubmitPayload> = new EventEmitter<FormBuilderSubmitPayload>(); // TODO: create type for submit form payload
    form: FormGroup = new FormGroup({});

    ngOnInit() {
        if (this.formUI) {
            const controls: Record<string, FormControl> = {};
            for (const node of this.formUI.nodes) {
                if (node.attributes.node_type !== "input") continue
                if (node.attributes.type === 'submit') continue; // don't add submit buttons to the form
                if (!controls[node.attributes.name]) {
                    controls[node.attributes.name] = new FormControl({
                        value: node.attributes.value || '',
                        disabled: node.attributes.disabled,
                    }, this.formControlValidators(node));
                }
            }
            this.form = new FormGroup(controls);
        }
    }

    onSubmit(node: UiNode): void {
        if (isInputAttributes(node.attributes)) {
            const inputAttrs: UiNodeInputAttributes = node.attributes;
            this.formSubmit.emit({
                group: node.group,
                action: inputAttrs.name,
                value: inputAttrs.value,
                form: this.form.value,
            });
        }
    }

    label(node: UiNode): string | undefined {
        if (node.attributes.node_type === 'a') {
            return node.attributes.title.text
        }
        return node.meta.label?.text
    }

    makePath(node: UiNode): string {
        if (node.attributes.node_type === "a") {
            return makeLink(node.attributes.href)
        }
        return ""
    }

    isSubmitDisabled(node: UiNode): boolean {
        const { attributes } = node;

        if (attributes.node_type !== "input" || attributes.name !== "method") {
            return false;
        }

        return Object.values(this.form.controls).some(control => !!control.errors);
    }

    private formControlValidators(node: UiNode): ValidatorFn[] {
        let validatorsList: ValidatorFn[] = []
        if (node.attributes.node_type === "input") {
            if (node.attributes.name === "identifier" || node.attributes.type === "email") {
                validatorsList.push(Validators.email)
            }
            if (node.attributes.required) {
                validatorsList.push(Validators.required)
            }
        }
        return validatorsList
    }
}
