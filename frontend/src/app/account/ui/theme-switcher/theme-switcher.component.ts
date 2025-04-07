import { Component } from '@angular/core';

@Component({
    selector: '#theme-switcher',
    template: `
        <button (click)="switchTheme()" class="btn rounded-circle bold fs-5">
            <span *ngIf="dark">☀</span>
            <span *ngIf="!dark">🌙</span>
        </button>
    `,
    standalone: false
})
export class ThemeSwitcherComponent {
    dark: boolean = true; // true = "dark", false = "light"

    switchTheme(): void {
        this.dark = !this.dark;
        if (this.dark) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", "light");
        }
    }
}
