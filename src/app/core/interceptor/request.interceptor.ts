import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //pass custom value in query string for every request    
    const queryString = "key=" + environment.apiKey;
    let requestUrl: string = request.url.indexOf("?") == -1 ? request.url + "?" + queryString
      : request.url + "&" + queryString;
    
    
    const isUserLoggerIn = true;
    //pass Authorization or custom header for every request if user is authenticated
    if (isUserLoggerIn) {      
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authenticationService.getAuthToken}`
        },
        url: requestUrl
      }
      )
    }
    return next.handle(request);
  }
}
