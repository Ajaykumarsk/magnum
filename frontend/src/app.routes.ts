import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/core/auth/guards/auth.guard';
import { guestGuard } from './app/core/auth/guards/guest.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
            {
                path: 'configuration',
                loadComponent: () => import('./app/features/configuration/pages/config-dashboard/config-dashboard.component')
                    .then(m => m.ConfigDashboardComponent)
            },
            {
                path: 'configuration/resource/compliance',
                loadComponent: () => import('./app/features/configuration/pages/compliance-master/compliance-master.component')
                    .then(m => m.ComplianceMasterComponent)
            },
            {
                path: 'configuration/:category',
                loadComponent: () => import('./app/features/configuration/pages/category-masters/category-masters.component')
                    .then(m => m.CategoryMastersComponent)
            },
            {
                path: 'configuration/:category/:master',
                loadComponent: () => import('./app/features/configuration/pages/master-table/master-table.component')
                    .then(m => m.MasterTableComponent)
            },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', canActivate: [guestGuard], loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];