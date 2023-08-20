

import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpSentEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../tax_service/api.service';


@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    private isRefreshingToken: boolean = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('')


    constructor(private api: ApiService) {
    }

    addToken(request: HttpRequest<any>) {
        const token = this.api.getAuthToken();

        // if (!token) {
        //   return request;
        // }

        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(this.addToken(request)).pipe(

            catchError((err: HttpErrorResponse) => {
                const error = err.error || err.statusText;
                if (err && err.status === 400) {
                    return this.handle400Error(error);
                }
                else if (err && err.status === 401) {
                    alert('error 401')
                    // return this.handle401Error(request, next);
                }

                // else {
                //     return throwError(() => error)
                // }

                //  return throwError(() => error) 
                return throwError(() => new Error(error.message))

            })

        )
    }




    handle400Error(error: any): Observable<HttpEvent<any>> {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logOutUser();

        }
        return throwError(() => error)
    }

    logOutUser() {
        window.localStorage.clear();
        window.location.reload();
        return throwError(() => "")
    }

    // handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (!this.isRefreshingToken) {
    //         this.isRefreshingToken = true;
    //         this.tokenSubject.next('');

    //         const authService = this.api.get(AuthenticateService);
    //         return authService.refresh().pipe(
    //             switchMap((newToken: AuthenticateModel) => {
    //                 //یعنی اگر رفرش توکن ولید نبود لاگ ات کن
    //                 if (newToken) {
    //                     this.tokenSubject.next(newToken.token);
    //                     return next.handle(request.clone({ setHeaders: { Authorization: 'Bearer ' + newToken.token } }))
    //                 }
    //                 alert('لطفا مجددا وارد شوید')
    //                 return this.logOutUser();
    //             }),
    //             catchError(error => {
    //                 return this.logOutUser();
    //             }),
    //             finalize(() => {
    //                 this.isRefreshingToken = false;
    //             })
    //         )
    //     }
    //     return throwError(() => "")
    // }

}