import {AfterViewInit, Component, forwardRef, Injector, Input, OnInit} from '@angular/core';
import {UiNode, UiNodeInputAttributes} from "@ory/kratos-client";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
    selector: 'ory-input',
    templateUrl: 'ory-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OryInputComponent),
            multi: true
        }
    ]
})
export class OryInputComponent implements ControlValueAccessor, AfterViewInit {
    @Input() node: UiNode; // node of type UiNodeTypeEnum.Input

    @Input() type: string = 'text';
    @Input() placeholder: string = '';

    value: string = '';
    disabled = false;
    private ngControl: NgControl | null = null;
    constructor(private injector: Injector) {}

    ngAfterViewInit(): void {
        this.ngControl = this.injector.get(NgControl, null, { self: true });
    }

    attr(): UiNodeInputAttributes {
        return this.node.attributes as UiNodeInputAttributes;
    }

    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};
    writeValue(value: string): void {
        this.value = value || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    // State helpers
    get hasError(): boolean {
        return !!this.ngControl?.control?.invalid && !!this.ngControl?.control?.touched;
    }

    get isTouched(): boolean {
        return !!this.ngControl?.control?.touched;
    }

    get isDirty(): boolean {
        return !!this.ngControl?.control?.dirty;
    }

    get errors(): any {
        return this.ngControl?.control?.errors;
    }
}
