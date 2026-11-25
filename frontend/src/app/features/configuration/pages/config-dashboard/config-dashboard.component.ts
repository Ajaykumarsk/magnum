import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CONFIG_CATEGORIES, CategoryConfig } from '../../config-categories.data';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-config-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule],
    templateUrl: './config-dashboard.component.html'
})
export class ConfigDashboardComponent {
    private router = inject(Router);
    categories = CONFIG_CATEGORIES;

    openCategory(cat: CategoryConfig): void {
        this.router.navigate(['/configuration', cat.id]);
    }
}