export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    password: string;
    password_confirm: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone?: string;
    avatar?: string;
    role: 'admin' | 'manager' | 'user';
    is_active: boolean;
    is_verified: boolean;
    profile?: UserProfile;
    created_at: string;
    updated_at: string;
}

export interface UserProfile {
    bio?: string;
    date_of_birth?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
}

export interface TokenPayload {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
    email: string;
    role: string;
    full_name: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
}