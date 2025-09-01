import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TFlowUI} from '@client/shared/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UiNode} from '@ory/kratos-client';
import {NgClass} from '@angular/common';

@Component({
    selector: 'kr-form-builder',
    imports: [
        ReactiveFormsModule,
        NgClass,
    ],
    template: `
        @if (formUI) {
            <form
                [formGroup]="form"
            >
                @for (node of formUI.ui.nodes; track $index) {
                    <ng-container>
                        <!-- Input fields -->
                        @if (attr(node).type !== 'hidden' && attr(node).type !== 'submit') {
                            <div class="mb-4">
                                <label>{{ label(node) }}</label>
                                <input
                                    class="rounded-lg px-3 py-1 border block w-full border-slate-500 placeholder-slate-500"
                                    [attr.type]="attr(node).type"
                                    [formControlName]="attr(node).name"
                                    [attr.name]="attr(node).name"
                                    [attr.required]="attr(node).required || null"
                                    [attr.autocomplete]="attr(node).autocomplete || null"
                                    [attr.placeholder]="label(node)"
                                />
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
                                    [attr.name]="attr(node).name"
                                    [value]="attr(node).value"
                                    (click)="onSubmit(node)"
                                >
                                    {{ label(node) || attr(node).value }}
                                </button>
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
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>(); // TODO: create type for submit form payload
    form: FormGroup = new FormGroup({});

    onSubmit(node: UiNode): void {
        this.formSubmit.emit({
            values: this.form.value,
            group: node.group,
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
            const controls: Record<string, FormControl> = {};
            for (const node of this.formUI.ui.nodes) {
                controls[this.attr(node).name] = new FormControl({value: this.attr(node).value || '', disabled: this.attr(node).disabled});
            }
            this.form = new FormGroup(controls);
            this.form.valueChanges.subscribe(data => {
                console.log(this.form.valid, this.form.errors);
            })
        }
    }
}
