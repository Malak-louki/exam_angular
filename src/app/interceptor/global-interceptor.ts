import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const url = req.url.startsWith('http') ? req.url : environment.serverUrl + req.url;

  const clone = req.clone({
    url,
    withCredentials: true,
  });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
