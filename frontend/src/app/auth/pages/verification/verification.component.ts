import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap} from 'rxjs';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
    form$: Observable<any>;
    flow: string;
    messages: Message[];


    constructor(private auth: AuthService, private route: ActivatedRoute) {
        document.title = "Verification";
    }
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(data => {
            this.flow = data["flow"];
            this.form$ = this.auth.formGetVerification(this.flow).pipe(
                tap(data => {
                    this.messages = data.ui.messages.map((item:any) => { 
                        console.log(item);
                        return {severity: item.type, detail: item.text }
                    });
                })  
            );
        });
    }
}
