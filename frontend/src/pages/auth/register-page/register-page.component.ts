import { Component } from '@angular/core';
import {RegisterFormComponent} from '@features/auth/components/register-form/register-form.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register-page',
    imports: [
        RegisterFormComponent,
        RouterLink
    ],
  template: `
      <div class="flex flex-col gap-4">
          <auth-register-form/>
          <div>
              Already have an account? <a class="underline" routerLink="/auth/login">Login</a>
          </div>
      </div>
      `
})
export class RegisterPageComponent {

}
