import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';

const routes: Routes = [
    {
        path: "", component: AccountComponent
    }
];

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AccountModule { }
