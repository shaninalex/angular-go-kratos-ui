import { Component } from '@angular/core';

@Component({
  selector: 'layout-dashboard',
  imports: [],
  template: `
      <div>
          <ng-content/>
      </div>
  `,
})
export class DashboardLayoutComponent {

}
