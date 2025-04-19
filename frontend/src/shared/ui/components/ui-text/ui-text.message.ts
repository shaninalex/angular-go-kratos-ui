import {Component, Input} from '@angular/core';
import {UiText, UiTextTypeEnum} from '@ory/kratos-client';
import {NgClass} from '@angular/common';

@Component({
    selector: 'ui-text-message',
    imports: [
        NgClass
    ],
    template: `
        <div class="p-2 rounded text-xs my-2"
             [id]="msg.id"
             [ngClass]="{
                'bg-emerald-100': msg.type === UiTextTypeEnum.Success,
                'bg-blue-100': msg.type === UiTextTypeEnum.Info,
                'bg-red-100': msg.type === UiTextTypeEnum.Error,
            }">
            {{ msg.text }}
        </div>
    `
})
export class UiTextMessage {
    @Input() msg: UiText
    protected readonly UiTextTypeEnum = UiTextTypeEnum;
}
