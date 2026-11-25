export interface Notification {
    id: string;
    title: string;
    message: string;
    notification_type: 'info' | 'success' | 'warn' | 'error';
    is_read: boolean;
    read_at: string | null;
    action_url: string | null;
    created_at: string;
}

export interface WebSocketMessage {
    type: string;
    [key: string]: any;
}