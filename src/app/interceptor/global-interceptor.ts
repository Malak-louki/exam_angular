import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  // add server URL if not present
  const url = req.url.startsWith('http') ? req.url : environment.serverUrl + req.url;
  
  // Clone the request to add the new URL and withCredentials
  const clone = req.clone({
    url: url,
    withCredentials: true // include cookies
  });
  
  return next(clone);
};