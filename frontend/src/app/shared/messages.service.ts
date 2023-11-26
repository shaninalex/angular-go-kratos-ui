import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Message } from "src/app/typedefs/messages";

@Injectable()
export class MessagesService {
    public message: BehaviorSubject<Message | null> = new BehaviorSubject<Message | null>(null);
    public messages: Message[] = [];

    constructor() {
        this.message.subscribe({
            next: new_message => {
                if (new_message) this.messages.push(new_message as Message);
            }
        })
    }
}