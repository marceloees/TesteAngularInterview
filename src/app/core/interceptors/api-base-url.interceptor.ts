import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiReq = req.clone({
    url: `${API_BASE_URL}${req.url}`
  });

  return next(apiReq);
};


