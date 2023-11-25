import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UIService {
    public title: BehaviorSubject<string> = new BehaviorSubject<string>("Login");
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {
        this.title.subscribe({
            next: (title:string) => {
                document.title = `Angular Kratos UI - ${title}`;
            }
        })
    }
}