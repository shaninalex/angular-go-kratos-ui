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
      <div>
          <auth-register-form/>
          <div>
              Already have an account? <a class="underline" routerLink="/auth/login">Login</a>
          </div>
      </div>
      `
})
export class RegisterPageComponent {

}
