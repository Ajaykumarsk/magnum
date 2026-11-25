import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred';

            if (error.error instanceof ErrorEvent) {
                errorMessage = `Error: ${error.error.message}`;
            } else if (error.status !== 401) {
                switch (error.status) {
                    case 0:
                        errorMessage = 'Unable to connect to backend server.';
                        break;
                    case 400:
                        errorMessage = error.error?.message || 'Bad request.';
                        break;
                    case 403:
                        errorMessage = 'Permission denied.';
                        break;
                    case 404:
                        errorMessage = 'Resource not found.';
                        break;
                    case 500:
                        errorMessage = 'Internal server error.';
                        break;
                    default:
                        errorMessage = error.error?.message || `Error: ${error.status}`;
                }

                messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                    life: 5000
                });
            }

            return throwError(() => error);
        })
    );
};