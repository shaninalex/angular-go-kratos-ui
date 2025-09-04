import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilderSubmitPayload, TFlowUI} from '@client/shared/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UiNode} from '@ory/kratos-client';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'kr-form-builder',
    imports: [
        ReactiveFormsModule,
        NgClass,
        RouterLink,
    ],
    template: `
        @if (formUI) {
            <form [formGroup]="form">
                @if (formUI.ui.messages) {
                    <div class="flex flex-col gap-1 mb-4">
                        @for (message of formUI.ui.messages; track message.id) {
                            <div class="text-sm rounded px-2"
                                 [id]="message.id"
                                 [ngClass]="{
                                        'text-red-500 bg-red-50': message.type === 'error',
                                        'text-lime-500 bg-lime-50': message.type === 'success',
                                        'text-sky-500 bg-sky-50': message.type === 'info',
                                    }"
                            >
                                {{ message.text }}
                            </div>
                        }
                    </div>
                }
                @for (node of formUI.ui.nodes; track $index) {
                    <ng-container>
                        <!-- Input fields -->
                        @if (node.type === 'input') {
                            @if (attr(node).type !== 'hidden' && attr(node).type !== 'submit') {
                                <div class="mb-4">
                                    <label>
                                        {{ label(node) }}
                                        @if (attr(node).required) {
                                            <span class="text-red-500">*</span>
                                        }
                                    </label>
                                    <input
                                        class="mb-1 rounded-lg px-3 py-1 border block w-full border-slate-500 placeholder-slate-500"
                                        [attr.type]="attr(node).type"
                                        [formControlName]="attr(node).name"
                                        [attr.name]="attr(node).name"
                                        [attr.autocomplete]="attr(node).autocomplete || null"
                                        [attr.placeholder]="label(node)"
                                    />
                                    @if (node.messages) {
                                        <div class="flex flex-col gap-1">
                                            @for (message of node.messages; track message.id) {
                                                <div class="text-sm rounded px-2"
                                                     [id]="message.id"
                                                     [ngClass]="{
                                            'text-red-500 bg-red-50': message.type === 'error',
                                            'text-lime-500 bg-lime-50': message.type === 'success',
                                            'text-sky-500 bg-sky-50': message.type === 'info',
                                        }"
                                                >
                                                    {{ message.text }}
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }

                            <!-- Hidden inputs -->
                            @if (attr(node).type === 'hidden') {
                                <input
                                    [attr.type]="'hidden'"
                                    [formControlName]="attr(node).name"
                                    [attr.name]="attr(node).name"
                                />
                            }

                            <!-- Submit buttons -->
                            @if (attr(node).type === 'submit') {
                                <div class="mb-4">
                                    <button
                                        type="submit"
                                        class="border cursor-pointer rounded-lg px-3 py-1 disabled:bg-slate-200 disabled:pointer-events-none disabled:border-slate-200"
                                        [ngClass]="{
                                            'bg-red-200 hover:bg-rose-300 border-red-300': node.group === 'oidc',
                                            'bg-green-200 hover:bg-green-300 border-green-300': node.group !== 'oidc'
                                        }"
                                        [value]="attr(node).value"
                                        (click)="onSubmit(node)"
                                    >
                                        {{ label(node) || attr(node).value }}
                                    </button>
                                </div>
                            }
                        }

                        @if (node.type === 'a') {
                            <div class="mb-4">
                                <a class="border cursor-pointer rounded-lg px-3 py-1 disabled:bg-slate-200 disabled:pointer-events-none disabled:border-slate-200"
                                   href="{{ attr(node).href }}">
                                    {{ label(node) || attr(node).value }}
                                </a>
                            </div>
                        }
                    </ng-container>
                }
            </form>
        }
    `
})
export class FormBuilderComponent implements OnInit {
    @Input() formUI!: TFlowUI;
    @Output() formSubmit: EventEmitter<FormBuilderSubmitPayload> = new EventEmitter<FormBuilderSubmitPayload>(); // TODO: create type for submit form payload
    form: FormGroup = new FormGroup({});

    onSubmit(node: UiNode): void {
        this.formSubmit.emit({
            group: node.group,
            value: this.form.value,
        });
    }

    isSubmitDisabled(node: UiNode): boolean {
        // attr(node).disabled || !form.valid
        if (node.group === 'password') {
            return !this.form.valid
        }
        return false
    }

    // Yeah, it's ugly...
    attr(node: UiNode): any {
        return node.attributes as any
    }

    label(node: UiNode): string | undefined {
        return node.meta?.label?.text
    }

    ngOnInit() {
        if (this.formUI) {
            console.log(this.formUI)
            const controls: Record<string, FormControl> = {};
            for (const node of this.formUI.ui.nodes) {
                const attr = this.attr(node);
                if (attr.type === 'submit') continue; // don't add submit buttons to the form

                if (!controls[attr.name]) {
                    controls[attr.name] = new FormControl({
                        value: attr.value || '',
                        disabled: attr.disabled,
                    });
                }
                // controls[this.attr(node).name] = new FormControl({value: this.attr(node).value || '', disabled: this.attr(node).disabled});
            }
            this.form = new FormGroup(controls);
        }
    }
}
