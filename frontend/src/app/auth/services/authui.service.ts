import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthUIService {
    public formTitle: BehaviorSubject<string> = new BehaviorSubject<string>("Login");
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {
        this.formTitle.subscribe({
            next: (title:string) => {
                document.title = title;
            }
        })
    }
}