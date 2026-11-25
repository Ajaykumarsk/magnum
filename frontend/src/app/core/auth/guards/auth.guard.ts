import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.isAccessTokenValid() || tokenService.isRefreshTokenValid()) {
        const requiredRoles = route.data['roles'] as string[];
        if (requiredRoles) {
            const userRole = tokenService.getUserRole();
            if (!userRole || !requiredRoles.includes(userRole)) {
                router.navigate(['/notfound']);
                return false;
            }
        }
        return true;
    }

    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
};