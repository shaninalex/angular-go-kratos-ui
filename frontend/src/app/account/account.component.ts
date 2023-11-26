import { Component, ViewEncapsulation } from '@angular/core';
import { MessagesService } from '../shared/messages.service';
import { Message } from '../typedefs/messages';


@Component({
    selector: '#page-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent {
    messages: Message[] = [];

    constructor(
        private messagesService: MessagesService
    ) {
        this.messages = this.messagesService.messages;
    }
}
