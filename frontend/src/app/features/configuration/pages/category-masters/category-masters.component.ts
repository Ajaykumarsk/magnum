import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CONFIG_CATEGORIES, CategoryConfig, SubMasterConfig } from '../../config-categories.data';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-category-masters',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './category-masters.component.html'
})
export class CategoryMastersComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    currentCategory: CategoryConfig | null = null;

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const catId = params['category'];
            this.currentCategory = CONFIG_CATEGORIES.find(c => c.id === catId) || null;
        });
    }

    openSubMaster(sub: SubMasterConfig): void {
        if (!this.currentCategory) return;
        if (sub.customRoute) {
            this.router.navigate([sub.customRoute]);
        } else {
            this.router.navigate(['/configuration', this.currentCategory.id, sub.id]);
        }
    }

    goBack(): void {
        this.router.navigate(['/configuration']);
    }
}