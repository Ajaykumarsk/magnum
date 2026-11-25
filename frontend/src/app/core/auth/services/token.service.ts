import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../../models/auth.models';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly ACCESS_TOKEN_KEY = 'access_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';

    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    setTokens(access: string, refresh: string): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, access);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh);
    }

    removeTokens(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    isAccessTokenValid(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    isRefreshTokenValid(): boolean {
        const token = this.getRefreshToken();
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch {
            return true;
        }
    }

    getDecodedToken(): TokenPayload | null {
        const token = this.getAccessToken();
        if (!token) return null;
        try {
            return jwtDecode<TokenPayload>(token);
        } catch {
            return null;
        }
    }

    getUserRole(): string | null {
        return this.getDecodedToken()?.role || null;
    }

    getUserId(): string | null {
        return this.getDecodedToken()?.user_id || null;
    }
}