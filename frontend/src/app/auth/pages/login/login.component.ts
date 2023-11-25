import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form$: Observable<any>;

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
    ) {
        document.title = "Login";
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: params => {
                if (params.hasOwnProperty("flow")) {
                    this.form$ = this.auth.getLoginFlow(params["flow"]);
                } else {
                    this.form$ = this.auth.getLoginFlow();
                }
            }
        })
    }
}
