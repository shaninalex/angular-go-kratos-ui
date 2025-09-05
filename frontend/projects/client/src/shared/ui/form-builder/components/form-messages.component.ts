import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {UiText} from '@ory/kratos-client/api';

@Component({
    selector: 'kr-form-messages',
    imports: [
        NgClass
    ],
    template: `
        <div class="flex flex-col gap-1">
            @for (message of messages; track message.id) {
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
    `,
})
export class FormMessagesComponent {
    @Input() messages: UiText[] = [];
}
