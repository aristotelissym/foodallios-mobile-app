import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get("skip")) {
      return next.handle(req);
    }

    const userToken = `${sessionStorage.getItem('BearerTokenItem')}`;
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', userToken),
    });
    return next.handle(modifiedReq);
  }
}