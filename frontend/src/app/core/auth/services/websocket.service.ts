import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { WebSocketMessage } from '../../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
    private tokenService = inject(TokenService);

    private socket: WebSocket | null = null;
    private messagesSubject = new Subject<WebSocketMessage>();
    private connectionStatusSubject = new BehaviorSubject<boolean>(false);
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 3000;

    public messages$ = this.messagesSubject.asObservable();
    public connectionStatus$ = this.connectionStatusSubject.asObservable();

    connect(path: string = 'notifications'): void {
        const token = this.tokenService.getAccessToken();
        if (!token) return;

        if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

        const wsUrl = `${environment.wsUrl}/${path}/?token=${token}`;

        try {
            this.socket = new WebSocket(wsUrl);

            this.socket.onopen = () => {
                console.log('✅ WebSocket Connected');
                this.connectionStatusSubject.next(true);
                this.reconnectAttempts = 0;
            };

            this.socket.onmessage = (event: MessageEvent) => {
                try {
                    const data: WebSocketMessage = JSON.parse(event.data);
                    this.messagesSubject.next(data);
                } catch (error) {
                    console.error('WS parse error:', error);
                }
            };

            this.socket.onclose = (event: CloseEvent) => {
                console.log(`WebSocket closed: ${event.code}`);
                this.connectionStatusSubject.next(false);
                if (event.code !== 1000 && event.code !== 4001) {
                    this.attemptReconnect(path);
                }
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.connectionStatusSubject.next(false);
            };
        } catch (error) {
            console.error('WebSocket creation error:', error);
        }
    }

    send(message: any): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    markAsRead(notificationId: string): void {
        this.send({ type: 'mark_read', notification_id: notificationId });
    }

    markAllAsRead(): void {
        this.send({ type: 'mark_all_read' });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close(1000, 'Client disconnect');
            this.socket = null;
        }
        this.connectionStatusSubject.next(false);
        this.reconnectAttempts = 0;
    }

    private attemptReconnect(path: string): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
        this.reconnectAttempts++;
        setTimeout(() => {
            if (this.tokenService.isAccessTokenValid()) {
                this.connect(path);
            }
        }, this.reconnectInterval * this.reconnectAttempts);
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}