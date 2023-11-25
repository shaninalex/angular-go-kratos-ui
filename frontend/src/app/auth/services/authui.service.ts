import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthUIService {
    public formTitle: BehaviorSubject<string> = new BehaviorSubject<string>("Login");

    constructor() {
        this.formTitle.subscribe({
            next: (title:string) => {
                document.title = title;
            }
        })
    }
}