import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    User,
    ChangePasswordRequest
} from '../../models/auth.models';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private tokenService = inject(TokenService);

    private readonly API_URL = `${environment.apiUrl}/auth`;

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {
        this.checkAuthStatus();
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login/`, credentials).pipe(
            tap((response) => {
                this.tokenService.setTokens(response.access, response.refresh);
                this.currentUserSubject.next(response.user);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    register(data: RegisterRequest): Observable<ApiResponse<{ user: User; tokens: { access: string; refresh: string } }>> {
        return this.http
            .post<ApiResponse<{ user: User; tokens: { access: string; refresh: string } }>>(`${this.API_URL}/register/`, data)
            .pipe(
                tap((response) => {
                    if (response.success && response.data) {
                        this.tokenService.setTokens(response.data.tokens.access, response.data.tokens.refresh);
                        this.currentUserSubject.next(response.data.user);
                        this.isAuthenticatedSubject.next(true);
                    }
                })
            );
    }

    logout(): void {
        console.log('🔑 AuthService logout executing');
        const refreshToken = this.tokenService.getRefreshToken();

        const doLocalLogout = () => {
            console.log('🧹 Clearing tokens & redirecting to login page');
            this.tokenService.removeTokens();
            this.currentUserSubject.next(null);
            this.isAuthenticatedSubject.next(false);
            this.router.navigate(['/auth/login']);
        };

        if (refreshToken) {
            this.http.post(`${this.API_URL}/logout/`, { refresh: refreshToken }).subscribe({
                next: () => doLocalLogout(),
                error: (err) => {
                    console.warn('Backend logout call returned error (ignoring and logging out anyway):', err);
                    doLocalLogout();
                }
            });
        } else {
            doLocalLogout();
        }
    }

    refreshToken(): Observable<{ access: string; refresh: string }> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token'));
        }

        return this.http
            .post<{ access: string; refresh: string }>(`${this.API_URL}/token/refresh/`, { refresh: refreshToken })
            .pipe(
                tap((response) => {
                    this.tokenService.setTokens(response.access, response.refresh);
                }),
                catchError((error) => {
                    this.clearSession();
                    return throwError(() => error);
                })
            );
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/profile/`).pipe(tap((user) => this.currentUserSubject.next(user)));
    }

    updateProfile(data: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.API_URL}/profile/`, data).pipe(tap((user) => this.currentUserSubject.next(user)));
    }

    changePassword(data: ChangePasswordRequest): Observable<ApiResponse<null>> {
        return this.http.post<ApiResponse<null>>(`${this.API_URL}/change-password/`, data);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    private checkAuthStatus(): void {
        if (this.tokenService.isAccessTokenValid()) {
            this.isAuthenticatedSubject.next(true);
            this.getProfile().subscribe({
                error: () => {
                    if (this.tokenService.isRefreshTokenValid()) {
                        this.refreshToken().subscribe({
                            next: () => this.getProfile().subscribe(),
                            error: () => this.clearSession()
                        });
                    } else {
                        this.clearSession();
                    }
                }
            });
        } else if (this.tokenService.isRefreshTokenValid()) {
            this.refreshToken().subscribe({
                next: () => {
                    this.isAuthenticatedSubject.next(true);
                    this.getProfile().subscribe();
                },
                error: () => this.clearSession()
            });
        }
    }

    private clearSession(): void {
        this.tokenService.removeTokens();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/auth/login']);
    }
}