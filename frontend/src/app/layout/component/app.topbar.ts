import { Component, inject, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AvatarModule } from 'primeng/avatar';
import { DatePickerModule } from 'primeng/datepicker';
import { Popover, PopoverModule } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@/app/core/auth/services/auth.service';
import { NotificationService } from '@/app/core/auth/services/notification.service';
import { User } from '@/app/core/models/auth.models';
import { Notification } from '@/app/core/models/notification.model';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        StyleClassModule,
        AppConfigurator,
        AvatarModule,
        DatePickerModule,
        PopoverModule,
        BadgeModule
    ],
    template: `
        <div class="layout-topbar">
            <!-- Left: logo / hamburger area -->
            <div class="layout-topbar-logo-container" style="width:auto; min-width:0;">
                <!-- Optional page title -->
            </div>

            <!-- Right actions -->
            <div class="layout-topbar-actions">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{ pi: true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>

                    <div class="relative">
                        <button
                            type="button"
                            class="layout-topbar-action layout-topbar-action-highlight"
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                        >
                            <i class="pi pi-palette"></i>
                        </button>
                        <app-configurator />
                    </div>
                </div>

                <button
                    type="button"
                    class="layout-topbar-menu-button layout-topbar-action"
                    pStyleClass="@next"
                    enterFromClass="hidden"
                    enterActiveClass="animate-scalein"
                    leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true"
                >
                    <i class="pi pi-ellipsis-v"></i>
                </button>

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">
                        <!-- Calendar Button (Hover + Click supported) -->
                        <button
                            type="button"
                            class="layout-topbar-action"
                            (click)="toggleCalendar($event)"
                            (mouseenter)="onCalendarHover($event)"
                            (mouseleave)="onCalendarLeave()"
                        >
                            <i class="pi pi-calendar"></i>
                            <span>Calendar</span>
                        </button>

                        <!-- Notifications Bell Button -->
                        <button
                            type="button"
                            class="layout-topbar-action relative"
                            (click)="toggleNotifications($event)"
                        >
                            @if (unreadCount > 0) {
                                <i
                                    class="pi pi-bell"
                                    pBadge
                                    [value]="unreadCount > 99 ? '99+' : unreadCount.toString()"
                                    severity="danger"
                                ></i>
                            } @else {
                                <i class="pi pi-bell"></i>
                            }
                            <span>Notifications</span>
                        </button>
                    </div>
                </div>

                <!-- Profile Avatar Button -->
                <div class="relative ml-2">
                    <p-avatar
                        [image]="currentUser?.avatar || undefined"
                        [label]="!currentUser?.avatar ? userInitials : undefined"
                        shape="circle"
                        size="normal"
                        styleClass="cursor-pointer"
                        (click)="profilePopover.toggle($event)"
                    />
                </div>
            </div>
        </div>

        <!-- ───────────────────────────────────────────── -->
        <!-- PROFILE POPOVER DROPDOWN                     -->
        <!-- ───────────────────────────────────────────── -->
        <p-popover #profilePopover>
            <div class="w-56 p-2">
                <!-- User Info Header -->
                <div class="px-3 py-2 mb-2 border-b border-surface dark:border-surface-700">
                    <div class="font-semibold text-surface-900 dark:text-surface-0 truncate">
                        {{ currentUser?.full_name || currentUser?.email || 'Admin User' }}
                    </div>
                    <div class="text-xs text-muted-color capitalize mt-0.5">
                        {{ currentUser?.role || 'User' }}
                    </div>
                </div>

                <!-- Menu Action Buttons -->
                <div class="flex flex-col gap-1">
                    <button
                        type="button"
                        class="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors text-left cursor-pointer"
                        (click)="profilePopover.hide(); goToProfile()"
                    >
                        <i class="pi pi-user text-muted-color"></i>
                        <span>Profile</span>
                    </button>

                    <button
                        type="button"
                        class="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors text-left cursor-pointer"
                        (click)="profilePopover.hide()"
                    >
                        <i class="pi pi-cog text-muted-color"></i>
                        <span>Settings</span>
                    </button>

                    <div class="my-1 border-t border-surface dark:border-surface-700"></div>

                    <!-- LOGOUT BUTTON -->
                    <button
                        type="button"
                        class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors text-left font-medium cursor-pointer"
                        (click)="profilePopover.hide(); logout()"
                    >
                        <i class="pi pi-power-off text-red-600 dark:text-red-400"></i>
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </p-popover>

        <!-- ───────────────────────────────────────────── -->
        <!-- CALENDAR POPOVER                              -->
        <!-- ───────────────────────────────────────────── -->
        <p-popover #calendarPopover (onHide)="calendarOpen = false">
            <div
                class="p-3 w-80"
                (mouseenter)="clearCalendarTimer()"
                (mouseleave)="onCalendarLeave()"
            >
                <div class="font-bold text-lg mb-3 flex items-center gap-2">
                    <i class="pi pi-calendar text-primary"></i>
                    <span>Calendar</span>
                </div>
                <p-datepicker [(ngModel)]="selectedDate" [inline]="true" styleClass="w-full" />
            </div>
        </p-popover>

        <!-- ───────────────────────────────────────────── -->
        <!-- NOTIFICATIONS POPOVER                         -->
        <!-- ───────────────────────────────────────────── -->
        <p-popover #notifPopover>
            <div class="w-96">
                <div class="flex items-center justify-between p-4 border-b border-surface">
                    <span class="font-bold text-lg">Notifications</span>
                    @if (unreadCount > 0) {
                        <button
                            type="button"
                            class="text-primary text-sm font-medium cursor-pointer hover:underline"
                            (click)="markAllRead()"
                        >
                            Mark all as read
                        </button>
                    }
                </div>

                <div class="max-h-80 overflow-y-auto">
                    @if (notifications.length === 0) {
                        <div class="p-6 text-center text-muted-color">
                            <i class="pi pi-bell-slash text-4xl mb-3 block"></i>
                            <span>No notifications yet</span>
                        </div>
                    } @else {
                        @for (notif of notifications; track notif.id) {
                            <div
                                class="flex gap-3 p-4 border-b border-surface cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                [class.bg-primary-50]="!notif.is_read"
                                [class.dark:bg-primary-900]="!notif.is_read"
                                (click)="onNotificationClick(notif)"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                                    [ngClass]="{
                                        'bg-blue-100 text-blue-600': notif.notification_type === 'info',
                                        'bg-green-100 text-green-600': notif.notification_type === 'success',
                                        'bg-yellow-100 text-yellow-600': notif.notification_type === 'warn',
                                        'bg-red-100 text-red-600': notif.notification_type === 'error'
                                    }"
                                >
                                    <i
                                        class="pi"
                                        [ngClass]="{
                                            'pi-info-circle': notif.notification_type === 'info',
                                            'pi-check-circle': notif.notification_type === 'success',
                                            'pi-exclamation-triangle': notif.notification_type === 'warn',
                                            'pi-times-circle': notif.notification_type === 'error'
                                        }"
                                    ></i>
                                </div>

                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <span class="font-semibold text-sm truncate">{{ notif.title }}</span>
                                        @if (!notif.is_read) {
                                            <span class="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                                        }
                                    </div>
                                    <p class="text-muted-color text-sm mt-1 line-clamp-2 m-0">{{ notif.message }}</p>
                                    <span class="text-muted-color text-xs mt-1 block">{{ notif.created_at | date: 'short' }}</span>
                                </div>
                            </div>
                        }
                    }
                </div>
            </div>
        </p-popover>
    `
})
export class AppTopbar implements OnInit, OnDestroy {
    @ViewChild('profilePopover') profilePopover!: Popover;
    @ViewChild('calendarPopover') calendarPopover!: Popover;
    @ViewChild('notifPopover') notifPopover!: Popover;

    layoutService = inject(LayoutService);
    private authService = inject(AuthService);
    private notificationService = inject(NotificationService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    selectedDate = new Date();
    currentUser: User | null = null;
    unreadCount = 0;
    notifications: Notification[] = [];
    calendarOpen = false;

    private destroy$ = new Subject<void>();
    private calendarLeaveTimer: any;

    ngOnInit(): void {
        // Current user
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                this.currentUser = user;
            });

        // Unread count
        this.notificationService.unreadCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((count) => {
                this.unreadCount = count;
            });

        // Notifications list
        this.notificationService.notifications$
            .pipe(takeUntil(this.destroy$))
            .subscribe((notifs) => {
                this.notifications = notifs;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get userInitials(): string {
        if (!this.currentUser) return 'AU';
        const first = this.currentUser.first_name?.charAt(0) || '';
        const last = this.currentUser.last_name?.charAt(0) || '';
        return (first + last).toUpperCase() || 'AU';
    }

    // ── Calendar Hover Logic ──────────────────────

    toggleCalendar(e: Event) {
        this.calendarPopover.toggle(e);
        this.calendarOpen = !this.calendarOpen;
    }

    onCalendarHover(e: Event) {
        clearTimeout(this.calendarLeaveTimer);
        if (!this.calendarOpen) {
            this.calendarPopover.show(e);
            this.calendarOpen = true;
        }
    }

    clearCalendarTimer() {
        clearTimeout(this.calendarLeaveTimer);
    }

    onCalendarLeave() {
        this.calendarLeaveTimer = setTimeout(() => {
            this.calendarPopover.hide();
            this.calendarOpen = false;
        }, 250);
    }

    // ── Notifications ────────────────────────────

    toggleNotifications(e: Event) {
        this.notifPopover.toggle(e);
    }

    markAllRead(): void {
        this.notificationService.markAllAsRead();
        this.messageService.add({
            severity: 'success',
            summary: 'Done',
            detail: 'All notifications marked as read',
            life: 2000
        });
    }

    onNotificationClick(notif: Notification): void {
        if (!notif.is_read) {
            this.notificationService.markAsRead(notif.id);
        }
    }

    // ── Actions ──────────────────────────────────

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((s) => ({ ...s, darkTheme: !s.darkTheme }));
    }

    goToProfile() {
        this.router.navigate(['/profile']);
    }

    logout() {
        console.log('🚪 Logout clicked!');
        this.notificationService.cleanup();
        this.authService.logout();
    }
}