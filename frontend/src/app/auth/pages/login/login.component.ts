import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form$: Observable<any>; // TODO: Types for login form

    constructor(private auth: AuthService) {
        document.title = "Login";
    }

    ngOnInit(): void {
        this.form$ = this.auth.getLoginFlow()
    }
}
