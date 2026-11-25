import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

/**
 * Prevents authenticated users from accessing login/register pages.
 */
export const guestGuard: CanActivateFn = () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.isAccessTokenValid()) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};