import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { tap } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //customize response before subscribe call
        console.log(event.body)
      }
    },//handle error 
      (error: any) => {
        if (event instanceof HttpErrorResponse) {
         if(error.status===401){
           this.authenticationService.logout();
           //can refresh the token and resubmit request if application does not have sliding expiry for token
         }
        const err = error.error.message || error.statusText;
        return throwError(err);      
      }
    }));
  }
}
