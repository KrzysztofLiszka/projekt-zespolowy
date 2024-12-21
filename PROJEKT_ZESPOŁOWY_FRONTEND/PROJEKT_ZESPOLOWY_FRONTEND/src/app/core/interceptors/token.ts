import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    let token = '';

    // Sprawdzenie, czy kod działa po stronie klienta
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('tokenPZ') || '';
    }

    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(clonedRequest);
    }

    return next(req);
};
