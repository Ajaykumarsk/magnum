import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const authService = inject(AuthService);

    // Skip auth URLs
    if (isAuthRequest(req)) {
        return next(req);
    }

    // Add token to request
    const token = tokenService.getAccessToken();
    if (token) {
        req = addToken(req, token);
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !isAuthRequest(req)) {
                return handle401Error(req, next, authService, tokenService);
            }
            return throwError(() => error);
        })
    );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });
}

function isAuthRequest(request: HttpRequest<any>): boolean {
    return ['/auth/login/', '/auth/register/', '/auth/token/refresh/'].some((url) => request.url.includes(url));
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, tokenService: TokenService) {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
            switchMap((tokens) => {
                isRefreshing = false;
                refreshTokenSubject.next(tokens.access);
                return next(addToken(request, tokens.access));
            }),
            catchError((err) => {
                isRefreshing = false;
                authService.logout();
                return throwError(() => err);
            })
        );
    } else {
        return refreshTokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((token) => next(addToken(request, token)))
        );
    }
}