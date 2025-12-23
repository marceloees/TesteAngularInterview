import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseUrlInterceptor } from './interceptors/api-base-url.interceptor';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';

export const CORE_PROVIDERS = [
  provideHttpClient(
    withInterceptors([
      apiBaseUrlInterceptor,
      httpErrorInterceptor
    ])
  )
];



