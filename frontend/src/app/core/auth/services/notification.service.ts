import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { WebSocketService } from './websocket.service';
import { ApiService } from './api.service';
import { Notification, WebSocketMessage } from '../../models/notification.model';
import { PaginatedResponse } from '../../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements OnDestroy {
    private wsService = inject(WebSocketService);
    private apiService = inject(ApiService);
    private messageService = inject(MessageService);

    private unreadCountSubject = new BehaviorSubject<number>(0);
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    private destroy$ = new Subject<void>();

    public unreadCount$ = this.unreadCountSubject.asObservable();
    public notifications$ = this.notificationsSubject.asObservable();

    constructor() {
        this.listenToWebSocket();
    }

    initialize(): void {
        this.wsService.connect('notifications');
        this.loadNotifications();
        this.loadUnreadCount();
    }

    cleanup(): void {
        this.wsService.disconnect();
        this.notificationsSubject.next([]);
        this.unreadCountSubject.next(0);
    }

    loadNotifications(params?: any): void {
        this.apiService
            .getList<Notification>('notifications', params)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: PaginatedResponse<Notification>) => {
                    this.notificationsSubject.next(response.results);
                }
            });
    }

    loadUnreadCount(): void {
        this.apiService
            .getById<any>('notifications', 'unread-count')
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res: any) => {
                    this.unreadCountSubject.next(res.data?.unread_count || 0);
                }
            });
    }

    markAsRead(notificationId: string): void {
        this.wsService.markAsRead(notificationId);
    }

    markAllAsRead(): void {
        this.wsService.markAllAsRead();
    }

    private listenToWebSocket(): void {
        this.wsService.messages$.pipe(takeUntil(this.destroy$)).subscribe((message: WebSocketMessage) => {
            switch (message['type']) {
                case 'connection_established':
                    this.unreadCountSubject.next(message['unread_count'] || 0);
                    break;
                case 'new_notification':
                    this.handleNewNotification(message['notification']);
                    break;
                case 'notification_read':
                    this.handleNotificationRead(message['notification_id'], message['unread_count']);
                    break;
                case 'all_notifications_read':
                    this.handleAllRead();
                    break;
            }
        });
    }

    private handleNewNotification(notification: Notification): void {
        const current = this.notificationsSubject.value;
        this.notificationsSubject.next([notification, ...current]);
        this.unreadCountSubject.next(this.unreadCountSubject.value + 1);

        this.messageService.add({
            severity: notification.notification_type || 'info',
            summary: notification.title,
            detail: notification.message,
            life: 5000
        });
    }

    private handleNotificationRead(notificationId: string, unreadCount: number): void {
        const current = this.notificationsSubject.value;
        const updated = current.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n));
        this.notificationsSubject.next(updated);
        this.unreadCountSubject.next(unreadCount);
    }

    private handleAllRead(): void {
        const current = this.notificationsSubject.value;
        const updated = current.map((n) => ({ ...n, is_read: true }));
        this.notificationsSubject.next(updated);
        this.unreadCountSubject.next(0);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}