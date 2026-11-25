import { Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenu],
    template: `
        <div
            class="layout-sidebar diamond-sidebar"
            [class.sidebar-dark]="layoutService.isDarkTheme()"
            [class.sidebar-light]="!layoutService.isDarkTheme()"
            [class.expanded]="isExpanded()"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
        >
            <div class="menu-container">
                <app-menu></app-menu>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: contents;
        }

        /* Content offset — always account for slim/expanded rail */
        ::ng-deep .layout-main-container {
            transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
            padding-top: 5rem !important;
            min-height: calc(100vh - 4rem);
            margin-left: 4.5rem !important;
        }

        ::ng-deep .layout-wrapper.layout-sidebar-active .layout-main-container,
        ::ng-deep .layout-wrapper.layout-static:not(.layout-static-inactive) .layout-main-container {
            margin-left: 16rem !important;
        }

        /* Very small phones: still keep a slim rail (no hamburger) */
        @media (max-width: 575px) {
            ::ng-deep .layout-main-container {
                margin-left: 4.5rem !important;
            }
            ::ng-deep .layout-wrapper.layout-sidebar-active .layout-main-container {
                margin-left: 4.5rem !important; /* overlay expand, don't push */
            }
        }

        /* Sidebar shell — always visible slim rail */
        .diamond-sidebar {
            position: fixed !important;
            top: 4rem !important;
            left: 0 !important;
            bottom: 0 !important;
            height: calc(100vh - 4rem) !important;
            width: 4.5rem !important;
            z-index: 998 !important;
            transform: none !important;          /* never off-canvas */
            transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                        background-color 0.2s ease,
                        border-color 0.2s ease,
                        box-shadow 0.25s ease !important;
            display: flex !important;
            flex-direction: column !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
        }

        .diamond-sidebar::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
        }

        /* Expanded = pinned or hovered */
        .diamond-sidebar.expanded {
            width: 16rem !important;
        }

        /* On very small screens, expand overlays content instead of pushing */
        @media (max-width: 575px) {
            .diamond-sidebar.expanded {
                width: 16rem !important;
                max-width: 85vw !important;
                box-shadow: 6px 0 24px rgba(0, 0, 0, 0.35) !important;
                z-index: 1100 !important;
            }
        }

        .menu-container {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
        }
        .menu-container::-webkit-scrollbar { display: none !important; }

        ::ng-deep .diamond-sidebar .layout-menu {
            padding: 0.5rem 0.5rem 2rem 0.5rem !important;
            margin: 0 !important;
            list-style: none !important;
        }

        ::ng-deep .diamond-sidebar .layout-menuitem-root-text {
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin: 1.25rem 0 0.5rem 0.75rem !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Slim: icons only */
        ::ng-deep .diamond-sidebar:not(.expanded) .layout-menuitem-root-text,
        ::ng-deep .diamond-sidebar:not(.expanded) .layout-menuitem-text,
        ::ng-deep .diamond-sidebar:not(.expanded) .layout-submenu-toggler {
            display: none !important;
        }

        ::ng-deep .diamond-sidebar:not(.expanded) .layout-menuitem-link {
            justify-content: center !important;
            padding: 0.75rem 0 !important;
        }

        ::ng-deep .diamond-sidebar:not(.expanded) .layout-menuitem-icon {
            margin-right: 0 !important;
        }

        /* Expanded: full labels */
        ::ng-deep .diamond-sidebar.expanded .layout-menuitem-root-text,
        ::ng-deep .diamond-sidebar.expanded .layout-menuitem-text,
        ::ng-deep .diamond-sidebar.expanded .layout-submenu-toggler {
            display: block !important;
        }

        ::ng-deep .diamond-sidebar.expanded .layout-menuitem-link {
            justify-content: flex-start !important;
            padding: 0.75rem 0.85rem !important;
        }

        ::ng-deep .diamond-sidebar.expanded .layout-menuitem-icon {
            margin-right: 0.75rem !important;
        }

        ::ng-deep .diamond-sidebar .layout-menuitem-link {
            border-radius: 8px !important;
            margin-bottom: 2px;
            padding: 0.75rem 0.85rem !important;
            display: flex !important;
            align-items: center !important;
            transition: all 0.2s ease !important;
            text-decoration: none !important;
            white-space: nowrap;
            overflow: hidden;
        }

        ::ng-deep .diamond-sidebar .layout-menuitem-icon {
            font-size: 1.25rem !important;
            min-width: 1.75rem !important;
            width: 1.75rem !important;
            text-align: center;
            flex-shrink: 0;
        }

        ::ng-deep .diamond-sidebar .layout-menuitem-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        ::ng-deep .diamond-sidebar .layout-submenu {
            background: transparent !important;
            padding-left: 0.75rem !important;
            margin: 0 !important;
            list-style: none !important;
        }

        /* Light theme */
        .diamond-sidebar.sidebar-light {
            background-color: #ffffff !important;
            border-right: 1px solid #e2e8f0 !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-root-text { color: #64748b !important; }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-link { color: #334155 !important; }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-link:hover {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-link.active-route {
            background-color: #ecfdf5 !important;
            color: #059669 !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-icon { color: #64748b !important; }
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-link:hover .layout-menuitem-icon,
        ::ng-deep .diamond-sidebar.sidebar-light .layout-menuitem-link.active-route .layout-menuitem-icon {
            color: #10b981 !important;
        }

        /* Dark theme */
        .diamond-sidebar.sidebar-dark,
        ::ng-deep html.app-dark .diamond-sidebar {
            background-color: #0b132b !important;
            border-right: 1px solid #1c2541 !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-root-text,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-root-text { color: #64748b !important; }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-link,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-link { color: #cbd5e1 !important; }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-link:hover,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-link:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-link.active-route,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-link.active-route {
            background-color: rgba(255, 255, 255, 0.15) !important;
            color: #ffffff !important;
        }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-icon,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-icon { color: #94a3b8 !important; }
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-link:hover .layout-menuitem-icon,
        ::ng-deep .diamond-sidebar.sidebar-dark .layout-menuitem-link.active-route .layout-menuitem-icon,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-link:hover .layout-menuitem-icon,
        ::ng-deep html.app-dark .diamond-sidebar .layout-menuitem-link.active-route .layout-menuitem-icon {
            color: #38bdf8 !important;
        }
    `]
})
export class AppSidebar implements OnInit, OnDestroy {
    layoutService = inject(LayoutService);
    router = inject(Router);
    el = inject(ElementRef);

    private destroy$ = new Subject<void>();
    isHovered = false;

    isExpanded(): boolean {
        const isPinned = !this.layoutService.layoutState().staticMenuDesktopInactive;
        return isPinned || this.isHovered;
    }

    onMouseEnter() {
        // Hover-expand whenever slim (all breakpoints — no hamburger)
        if (this.layoutService.layoutState().staticMenuDesktopInactive) {
            this.isHovered = true;
            this.layoutService.layoutState.update((s) => ({ ...s, menuHoverActive: true }));
        }
    }

    onMouseLeave() {
        if (this.layoutService.layoutState().staticMenuDesktopInactive) {
            this.isHovered = false;
            this.layoutService.layoutState.update((s) => ({ ...s, menuHoverActive: false }));
        }
    }

    ngOnInit() {
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((e) => this.onRouteChange((e as NavigationEnd).urlAfterRedirects));

        this.onRouteChange(this.router.url);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private onRouteChange(path: string) {
        this.isHovered = false;
        this.layoutService.layoutState.update((val) => ({
            ...val,
            activePath: path,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menuHoverActive: false
        }));
    }
}