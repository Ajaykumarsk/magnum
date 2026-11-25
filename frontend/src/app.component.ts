// frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <p-toast position="top-right"></p-toast>
    <p-confirmDialog></p-confirmDialog>
    <router-outlet></router-outlet>
  `,
  imports: [Toast, ConfirmDialog, RouterOutlet],
})
export class AppComponent {
  constructor() {}
}