import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AppService } from './app.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    console.log("IN THE TOKEN INTERCEPTOR");
    let authService = this.injector.get(AppService);
    console.log(localStorage.getItem('token'));
    let tokenizedReq = req.clone({
      setHeaders: {
        Authortization: `Bearer ${authService.getUserToken()}`
      }
    })
    return next.handle(req).pipe(tap(() => {
        console.log('executed after the request');
    }));
  }

}
