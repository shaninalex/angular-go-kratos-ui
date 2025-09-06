import {Component, Input} from '@angular/core';
import {ContinueWith} from '@ory/kratos-client';
import {RouterLink} from '@angular/router';

@Component({
    selector: "kr-continue-with",
    imports: [
        RouterLink
    ],
    template: `
        @for (cw of continueWith; track $index) {
            @if (cw.action == "show_verification_ui") {
                @let params = link(cw);
                <a class="block mb-4 underline" [routerLink]="[params[0]]" [queryParams]="params[1]">
                    Proceed to verification page
                </a>
            }
        }
    `
})
export class ContinueWithComponent {
    @Input() continueWith: ContinueWith[]

    link(continueWith: ContinueWith): [string, Record<string, string>] {
        if (continueWith.action === "show_verification_ui" && continueWith.flow.url) {
            const u = new URL(continueWith.flow.url);
            const queryParams: Record<string, string> = {};
            u.searchParams.forEach((value, key) => {
                queryParams[key] = value;
            });
            return [u.pathname, queryParams];
        }
        return ["", {}];
    }
}
