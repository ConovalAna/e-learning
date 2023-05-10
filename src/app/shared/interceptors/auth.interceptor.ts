import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, lastValueFrom, throwError } from 'rxjs';
import { UserFacade } from 'src/app/state/users';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: UserFacade) {}
  later(delay: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // if your getAuthToken() function declared as "async getAuthToken() {}"
    let token = await this.authService.getAuthToken();
    if (!token) {
      await this.later(500);
      token = await this.authService.getAuthToken();
    }
    // if your getAuthToken() function declared to return an observable then you can use
    // await this.auth.getAuthToken().toPromise()

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await lastValueFrom(
      next.handle(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // redirect user to the logout page
            }
          }
          return throwError(err);
        })
      )
    );
  }
}
